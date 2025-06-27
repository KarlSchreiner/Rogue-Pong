import React, { FC, useEffect } from "react";
import Paddle from "../Paddle/Paddle";
import styles from "./AIPaddle.module.scss";
import { teamStats } from "../../../interface/stats";
import { paddleRectProperties } from "../../../interface/paddleRectProperties";

interface AIPaddleProps {
  count: number;
  paddleIndex: number;
  paddleRect: paddleRectProperties;
  delta: number;
  ballHeight: number;
  rightPaddleSetter: any;
  stats: teamStats;
  backgroundColor: string;
  inUse: boolean;
}

const AIPaddle: FC<AIPaddleProps> = (AIPaddleProps) => {
  return (
    <div className={styles.AIPaddle} data-testid="AIPaddle">
      <Paddle
        stats={AIPaddleProps.stats}
        count={AIPaddleProps.count}
        paddleIndex={AIPaddleProps.paddleIndex}
        paddleRect={AIPaddleProps.paddleRect}
        delta={AIPaddleProps.delta}
        ballHeight={AIPaddleProps.ballHeight}
        backgroundColor={AIPaddleProps.backgroundColor}
        paddleSetter={AIPaddleProps.rightPaddleSetter}
        inUse={AIPaddleProps.inUse}
      ></Paddle>
    </div>
  );
};

export default AIPaddle;
