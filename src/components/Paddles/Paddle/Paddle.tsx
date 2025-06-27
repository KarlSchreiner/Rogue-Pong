import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./Paddle.module.scss";
import { teamStats } from "../../../interface/stats";
import useSound from "use-sound";
import { paddleRectProperties } from "../../../interface/paddleRectProperties";
import { paddleTypes } from "../../../util/enums";
const overheatSoundImport = require("./overheat.mp3");

interface PaddleProps {
  paddleSetter: (index: number, rect: DOMRect) => void;
  count: number;
  paddleIndex: number;
  paddleRect: paddleRectProperties;
  delta: number;
  ballHeight: number;
  stats: teamStats;
  backgroundColor: string;
  inUse: boolean;
}

const maxDirectionInfluence = 0.666;
const OVERHEAT_CHECK_INTERVAL = 1000; //ms
const zombieColor = "#4b7a4b"; // gangrene-like color

const Paddle: FC<PaddleProps> = (paddleProps) => {
  const [position, setPosition] = useState(50);
  const [isOverheated, setIsOverheated] = useState(false);
  const [checkTimer, setCheckTimer] = useState(0);
  const [overheatTimer, setOverheatTimer] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(
    paddleProps.paddleRect.paddleType === paddleTypes.zombie
      ? zombieColor
      : paddleProps.backgroundColor
  );

  const [zombieMovingUp, setZombieMovingUp] = useState(true);

  const [overheatSound, { stop: stopOverheatSound }] =
    useSound(overheatSoundImport);
  const paddleRef = useRef<HTMLDivElement>(null);

  // Event loop
  useEffect(() => {
    if (isOverheated) {
      const newOverheatTimer = overheatTimer + paddleProps.delta;
      if (newOverheatTimer >= paddleProps.stats.overheatLength) {
        setIsOverheated(false);
        setOverheatTimer(0);
        setBackgroundColor(
          paddleProps.paddleRect.paddleType === paddleTypes.zombie
            ? zombieColor
            : paddleProps.backgroundColor
        );

        setCheckTimer(0); // <-- reset check timer on recovery to avoid immediate re-overheat
      } else {
        setOverheatTimer(newOverheatTimer);
      }
    } else {
      const newCheckTimer = checkTimer + paddleProps.delta;
      if (newCheckTimer >= OVERHEAT_CHECK_INTERVAL) {
        if (Math.random() < paddleProps.stats.overheatChance) {
          setIsOverheated(true);
          setOverheatTimer(0); // <-- reset overheat timer
          setBackgroundColor("red");
        }
        setCheckTimer(0); // always reset after checking
      } else {
        setCheckTimer(newCheckTimer);
      }
    }

    // Paddle tracking logic
    let direction = 0;
    if (
      paddleProps.paddleRect.paddleType === paddleTypes.regular &&
      paddleProps.inUse
    ) {
      direction =
        paddleProps.ballHeight - position > maxDirectionInfluence ||
        paddleProps.ballHeight - position < -maxDirectionInfluence
          ? Math.sign(paddleProps.ballHeight - position) * maxDirectionInfluence
          : paddleProps.ballHeight - position;
    } else {
      direction = zombieMovingUp ? -1 : 1;
    }

    let newPosition =
      position +
      paddleProps.stats.speed *
        paddleProps.delta *
        direction *
        (isOverheated ? 0 : 1);

    if (
      paddleProps.paddleRect.paddleType === paddleTypes.regular &&
      paddleProps.inUse
    ) {
      if (
        !isOverheated &&
        ((newPosition > paddleProps.ballHeight &&
          paddleProps.ballHeight > position) ||
          (newPosition < paddleProps.ballHeight &&
            paddleProps.ballHeight < position))
      ) {
        newPosition = paddleProps.ballHeight;
      }
    } else {
      if (newPosition <= 0) {
        newPosition = 0;
        setZombieMovingUp(false);
      } else if (newPosition >= 100) {
        newPosition = 100;
        setZombieMovingUp(true);
      }
    }

    setPosition(newPosition);
  }, [paddleProps.count]);

  useEffect(() => {
    if (backgroundColor === "red") {
      overheatSound();
    } else {
      stopOverheatSound();
    }
  }, [backgroundColor]);

  useEffect(() => {
    setPosition(position); // WHY IS THIS NECESSARY
    if (paddleRef.current) {
      paddleProps.paddleSetter(
        paddleProps.paddleIndex,
        paddleRef.current.getBoundingClientRect()
      );
    }
  }, [position]);

  return (
    <div
      ref={paddleRef}
      className={styles.Paddle}
      data-testid="Paddle"
      style={{ top: `${position}vh`, backgroundColor }}
    />
  );
};

export default Paddle;
