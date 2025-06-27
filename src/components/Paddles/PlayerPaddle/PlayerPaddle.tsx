import React, { FC, useEffect, useState } from "react";
import Paddle from "../Paddle/Paddle";
import styles from "./PlayerPaddle.module.scss";
import { teamStats } from "../../../interface/stats";
import { paddleRectProperties } from "../../../interface/paddleRectProperties";

const SPEED = 0.02;

interface PlayerPaddleProps {
  count: number;
  paddleIndex: number;
  paddleRect: paddleRectProperties;
  delta: number;
  ballHeight: number;
  leftPaddleSetter: any;
  stats: teamStats;
  backgroundColor: string;
  inUse: boolean;
}

const PlayerPaddle: FC<PlayerPaddleProps> = (PlayerPaddleProps) => {
  return (
    <div className={styles.PlayerPaddle} data-testid="PlayerPaddle">
      <Paddle
        paddleIndex={PlayerPaddleProps.paddleIndex}
        paddleRect={PlayerPaddleProps.paddleRect}
        stats={PlayerPaddleProps.stats}
        backgroundColor={PlayerPaddleProps.backgroundColor}
        count={PlayerPaddleProps.count}
        delta={PlayerPaddleProps.delta}
        ballHeight={PlayerPaddleProps.ballHeight}
        paddleSetter={PlayerPaddleProps.leftPaddleSetter}
        inUse={PlayerPaddleProps.inUse}
      ></Paddle>
    </div>
  );
};

export default PlayerPaddle;
