import React, { Component, FC, useEffect, useRef } from "react";
import styles from "./Ball.module.scss";
import { sides } from "../../util/enums";

//sound imports
import useSound from "use-sound";
const playerBoopSoundImport = require("./boop.wav");
const aiBoopSoundImport = require("./boop.wav");

interface BallProps {
  id: number;
  ballsIndex: number;
  ballInfoSetter: any;
  count: number;
  delta: number;
  leftPaddles: any[];
  rightPaddles: any[];
  healthSetter: (numChanged: number, who: sides) => void;
  // paddle: any
}

const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00000625;
const MAX_VELOCITY = 0.25;

const Ball: FC<BallProps> = (BallProps) => {
  const [position, setPosition] = React.useState({ x: 50, y: 50 });
  const [direction, setDirection] = React.useState({ x: 1, y: 0 });
  const [velocity, setVelocity] = React.useState(INITIAL_VELOCITY);
  const [playerBoopSound, playerBoopSoundExposed] = useSound(
    playerBoopSoundImport
  );
  const [aiBoopSound, aiBoopSoundExposed] = useSound(aiBoopSoundImport);

  const ballElemRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    reset();
  }, []);

  React.useEffect(() => {
    update(BallProps.delta);
  }, [BallProps.count]);

  React.useEffect(() => {
    BallProps.ballInfoSetter(BallProps.ballsIndex, {
      posX: position.x,
      posY: position.y,
      dirX: direction.x,
    });
  }, [position.y]);

  //apply default positioning of the ball and send it in a random direction
  function reset() {
    setPosition({ x: 50, y: 50 });
    let tempDirection = { x: 0, y: 0 };
    while (
      Math.abs(tempDirection.x) <= 0.2 ||
      Math.abs(tempDirection.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      tempDirection = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    setDirection(tempDirection);
    setVelocity(INITIAL_VELOCITY);
  }

  function checkIfPointScored(ballRect: any) {
    return ballRect.right >= window.innerWidth || ballRect.left <= 0;
  }

  function handlePointScored(ballRect: any) {
    reset();
    BallProps.healthSetter(
      1,
      ballRect.right >= window.innerWidth ? sides.ai : sides.player
    );
  }

  function update(delta: number /*paddleRects: any*/) {
    setPosition({
      x: position.x + direction.x * velocity * delta,
      y: position.y + direction.y * velocity * delta,
    });
    setVelocity(Math.min(velocity + VELOCITY_INCREASE * delta, MAX_VELOCITY));
    if (ballElemRef.current) {
      const ballRect = ballElemRef.current.getBoundingClientRect();

      if (ballRect.top <= 0) {
        setDirection({ x: direction.x, y: Math.abs(direction.y) });
      }

      if (ballRect.bottom >= window.innerHeight) {
        setDirection({ x: direction.x, y: Math.abs(direction.y) * -1 });
      }

      if (BallProps.rightPaddles.some((r) => isCollision(r, ballRect))) {
        setDirection({ x: Math.abs(direction.x) * -1, y: direction.y });
        aiBoopSound();
      }

      if (BallProps.leftPaddles.some((r) => isCollision(r, ballRect))) {
        setDirection({ x: Math.abs(direction.x), y: direction.y });
        playerBoopSound();
      }
      //handle this ball scoring a point
      if (checkIfPointScored(ballRect)) {
        handlePointScored(ballRect);
      }
    }
  }

  function randomNumberBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function isCollision(rect1: any, rect2: any) {
    if (!rect1 || !rect2) {
      return false;
    }
    // todo: make this work with paddles
    return (
      rect1.left <= rect2.right &&
      rect1.right >= rect2.left &&
      rect1.top <= rect2.bottom &&
      rect1.bottom >= rect2.top
    );
  }

  return (
    <div
      ref={ballElemRef}
      className={styles.Ball}
      style={{ left: `${position.x}vw`, top: `${position.y}vh` }}
      id={`Ball${BallProps.id}`}
    ></div>
  );
};

export default Ball;
