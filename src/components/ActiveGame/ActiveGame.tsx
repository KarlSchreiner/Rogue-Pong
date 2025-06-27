import React, { FC, useState } from "react";
import Ball from "../Ball/Ball";
import AIPaddle from "../Paddles/AIPaddle/AIPaddle";
import PlayerPaddle from "../Paddles/PlayerPaddle/PlayerPaddle";
import Paddle from "../Paddles/Paddle/Paddle";
import PlayerTeamHud from "../Hud/PlayerTeamHud/PlayerTeamHud";
import { paddleTypes, sides } from "../../util/enums";
import AiTeamHud from "../Hud/AITeamHud/AITeamHud";
import Hud from "../Hud/Hud";
import { healthInterface, teamStats, commonStats } from "../../interface/stats";
import { useLocation, useNavigate } from "react-router-dom";
import { ballInfo } from "../../interface/ballInfo";
import { paddleRectProperties } from "../../interface/paddleRectProperties";
import { paddleBallMapping } from "../../interface/paddleBallMapping";
import { GameContainer } from "./ActiveGame.styled";
import { useDispatch } from "react-redux";
import { advanceLevel } from "../../store/gameSlice";

interface ActiveGameProps {}

const ActiveGame: FC<ActiveGameProps> = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const playerStats = location.state?.playerStats as teamStats;
  const aiStats = location.state?.aiStats as teamStats;
  const commonStats = location.state?.commonStats as commonStats;
  const navigate = useNavigate();

  const leftPaddleColor = ["chartreuse"];
  const rightPaddleColor = ["aquamarine"];

  // console.log("re-rendered lmao")

  const [count, setCount] = useState(0);
  const [delta, setDelta] = useState(0);
  // const [ballHeight, setBallHeight] = useState(0);
  const [balls, setBalls] = useState<ballInfo[]>(
    Array(commonStats.numBalls).fill({ posX: 50, posY: 50, dirX: 0 })
  );

  const [playerBallHeightsToUse, setPlayerBallHeightsToUse] = useState<
    number[]
  >([]);
  const [AIBallHeightsToUse, setAIBallHeightsToUse] = useState<number[]>([]);

  //TODO: make interface taht is an object for all the data a ball has, and have an array of objects stored in here

  //todo change these from leftPaddleREcts to player paddle rects
  // const [ballsData, setBallsData] = useState([{}]);
  const [leftPaddleRects, setLeftPaddleRects] = useState<
    paddleRectProperties[]
  >([
    ...Array(playerStats.numPaddles).fill({
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      paddleType: paddleTypes.regular,
    }),
    ...Array(playerStats.numZombiePaddles).fill({
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      paddleType: paddleTypes.zombie,
    }),
  ]);
  const [rightPaddleRects, setRightPaddleRects] = useState<
    paddleRectProperties[]
  >([
    ...Array(aiStats.numPaddles).fill({
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      paddleType: paddleTypes.regular,
    }),
    ...Array(aiStats.numZombiePaddles).fill({
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      paddleType: paddleTypes.zombie,
    }),
  ]);

  //todo handle when health is down to 0
  const [health, setHealth] = useState<healthInterface>({
    playerHealth: playerStats.health,
    aiHealth: aiStats.health,
  });

  const createNewBall = () => {
    setBalls((prevValue) => [...prevValue, { posX: 50, posY: 50, dirX: 0 }]);
  };

  const deleteBall = (ballsIndex: number) => {
    setBalls((prevValue) => prevValue.splice(ballsIndex, 1));
  };

  const ballInfoSetter = (index: number, newBallInfo: ballInfo) => {
    setBalls((prevValue) => {
      let copyArray = [...prevValue];
      copyArray[index] = newBallInfo;
      return copyArray;
    });
  };

  const updatePaddleRects = (
    setPaddleRects: React.Dispatch<
      React.SetStateAction<paddleRectProperties[]>
    >,
    index: number,
    rect: DOMRect
  ) => {
    setPaddleRects((prevValue) => {
      const arrayCopy = [...prevValue];
      const existingPaddleType =
        arrayCopy[index]?.paddleType ?? paddleTypes.regular;

      const updatedRect: paddleRectProperties = {
        bottom: rect.bottom,
        top: rect.top,
        left: rect.left,
        right: rect.right,
        paddleType: existingPaddleType,
      };

      arrayCopy[index] = updatedRect;
      return arrayCopy;
    });
  };

  const leftPaddleSetter = (index: number, rect: DOMRect) => {
    updatePaddleRects(setLeftPaddleRects, index, rect);
  };

  const rightPaddleSetter = (index: number, rect: DOMRect) => {
    updatePaddleRects(setRightPaddleRects, index, rect);
  };

  const healthSetter = (numChanged: number, who: sides) => {
    if (who === sides.ai) {
      setHealth((prevValue) => ({
        ...prevValue,
        aiHealth: prevValue.aiHealth - numChanged,
      }));
    } else {
      setHealth((prevValue) => ({
        ...prevValue,
        playerHealth: prevValue.playerHealth - numChanged,
      }));
    }
  };

  // const handleIncrease = () => {
  //   setCount(count + 1);
  // };

  /**
   * Sorts balls based on approach direction and position, returning an array of their Y positions.
   * For player paddles, prioritizes balls moving towards the player (dirX < 0).
   * For AI paddles, prioritizes balls moving towards the AI (dirX > 0).
   *
   * @param isPlayer - true if calculating for player paddles, false for AI paddles
   * @returns number[] - Array of ball Y positions sorted by approach priority
   */
  const setBallHeightHelper = (isPlayer: boolean): number[] => {
    return [...balls]
      .sort((a, b) => {
        if (a.dirX > 0 && b.dirX < 0) {
          return isPlayer ? 1 : -1;
        } else if (a.dirX < 0 && b.dirX > 0) {
          return isPlayer ? -1 : 1;
        } else if (a.dirX > 0 && b.dirX > 0) {
          return a.posX > b.posX ? -1 : 1;
        } else {
          return a.posX > b.posX ? 1 : -1;
        }
      })
      .map((ballInfo) => ballInfo.posY);
  };

  /**
   * Maps paddles to the closest available balls based on vertical distance.
   * Ensures that each paddle moves toward the nearest ball approaching its side.
   * For player paddles, prioritizes balls moving left (toward player).
   * For AI paddles, prioritizes balls moving right (toward AI).
   *
   * @param paddleRects - Array of paddle DOMRects with paddle type information
   * @param isPlayer - true if calculating for player paddles, false for AI paddles
   * @returns number[] - Array of target Y positions for each paddle
   */
  const calculatePaddleBallHeights = (
    paddleRects: paddleRectProperties[],
    isPlayer: boolean
  ): number[] => {
    const ballHeightArray = setBallHeightHelper(isPlayer).slice(
      0,
      paddleRects.length
    );

    const paddleObjects: paddleBallMapping[] = paddleRects.map(
      (value, index) => ({
        top: (value.top / window.innerHeight) * 100,
        bottom: (value.bottom / window.innerHeight) * 100,
        hasBeenUsed: false,
        mapToPlayerBallHeightArray: null,
        mapToLeftPadddleRects: index,
      })
    );

    // Assign each paddle to the closest available ball
    ballHeightArray.forEach((ballHeight, indexOfBallHeight) => {
      paddleObjects.sort((a, b) => {
        if (a.hasBeenUsed && b.hasBeenUsed) return 0;
        if (a.hasBeenUsed) return 1;
        if (b.hasBeenUsed) return -1;

        const closestA = Math.min(
          Math.abs(a.top - ballHeight),
          Math.abs(a.bottom - ballHeight)
        );
        const closestB = Math.min(
          Math.abs(b.top - ballHeight),
          Math.abs(b.bottom - ballHeight)
        );
        return closestA - closestB;
      });

      paddleObjects[0].hasBeenUsed = true;
      paddleObjects[0].mapToPlayerBallHeightArray = indexOfBallHeight;
    });

    // Return array of target ball heights for each paddle (or default to 50 if no ball assigned)
    return paddleObjects
      .sort(
        (a, b) =>
          (a.mapToLeftPadddleRects ?? 0) - (b.mapToLeftPadddleRects ?? 0)
      )
      .map((obj) =>
        obj.mapToPlayerBallHeightArray == null
          ? 50
          : ballHeightArray[obj.mapToPlayerBallHeightArray]
      );
  };

  React.useEffect(() => {
    setPlayerBallHeightsToUse(
      calculatePaddleBallHeights(leftPaddleRects, true)
    );
    setAIBallHeightsToUse(calculatePaddleBallHeights(rightPaddleRects, false));
  }, [balls]);

  React.useEffect(() => {
    let frameId: number;
    let lastTime: number | undefined;

    const updateFunction = (time: number) => {
      const currentTime = time;

      if (lastTime) {
        const delta = currentTime - lastTime;
        setCount((prevCount) => prevCount + 1);
        setDelta(delta);
      }

      lastTime = currentTime;
      frameId = requestAnimationFrame(updateFunction);
    };
    requestAnimationFrame(updateFunction);
    return () => cancelAnimationFrame(frameId);
  }, []);

  React.useEffect(() => {
    if (health.aiHealth == 0 || health.playerHealth == 0) {
      // dispatch(advanceLevel());
      navigate("/result", { state: health });
    }
  }, [health]);

  return (
    <GameContainer data-testid="ActiveGame">
      {balls.map((ball: ballInfo, ballsIndex: number) => {
        return (
          <Ball
            id={ballsIndex}
            count={count}
            delta={delta}
            ballsIndex={ballsIndex}
            ballInfoSetter={ballInfoSetter}
            leftPaddles={leftPaddleRects}
            rightPaddles={rightPaddleRects}
            healthSetter={healthSetter}
            key={"Ball" + ballsIndex}
          />
        );
      })}

      {rightPaddleRects.map((rect, rectIndex) => {
        return (
          <AIPaddle
            stats={aiStats}
            count={count}
            paddleIndex={rectIndex}
            paddleRect={rect}
            delta={delta}
            ballHeight={AIBallHeightsToUse[rectIndex]}
            rightPaddleSetter={rightPaddleSetter}
            backgroundColor={rightPaddleColor[0]}
            key={"AIPaddle" + rectIndex}
            inUse={rectIndex < balls.length}
          />
        );
      })}

      {leftPaddleRects.map((rect, rectIndex) => {
        return (
          <PlayerPaddle
            stats={playerStats}
            count={count}
            paddleIndex={rectIndex}
            paddleRect={rect}
            delta={delta}
            ballHeight={playerBallHeightsToUse[rectIndex]}
            leftPaddleSetter={leftPaddleSetter}
            backgroundColor={leftPaddleColor[0]}
            key={"PlayerPaddle" + rectIndex}
            inUse={rectIndex < balls.length}
          />
        );
      })}

      <Hud health={health}></Hud>
    </GameContainer>
  );
};

export default ActiveGame;
