import React, { FC, useState } from "react";
import Ball from "../Ball/Ball";
import AIPaddle from "../Paddles/AIPaddle/AIPaddle";
import PlayerPaddle from "../Paddles/PlayerPaddle/PlayerPaddle";
import Paddle from "../Paddles/Paddle/Paddle";
import styles from "./ActiveGame.module.scss";
import PlayerTeamHud from "../Hud/PlayerTeamHud/PlayerTeamHud";
import { sides } from "../../util/enums";
import AiTeamHud from "../Hud/AITeamHud/AITeamHud";
import Hud from "../Hud/Hud";
import { healthInterface, stats } from "../../interface/stats";
import { useLocation, useNavigate } from "react-router-dom";
import { ballInfo } from "../../interface/ballInfo";
import { paddleRectProperties } from "../../interface/paddleRectProperties";
import { paddleBallMapping } from "../../interface/paddleBallMapping";

interface ActiveGameProps {}

const ActiveGame: FC<ActiveGameProps> = () => {
  const location = useLocation();
  const playerStats = location.state?.playerStats as stats;
  const aiStats = location.state?.aiStats as stats;
  const navigate = useNavigate();

  //added this to highlight switching vs not switching of paddles
  const leftPaddleColor = ["chartreuse", "green"];
  const rightPaddleColor = ["aquamarine", "blue"];

  // console.log("re-rendered lmao")

  const [count, setCount] = useState(0);
  const [delta, setDelta] = useState(0);
  // const [ballHeight, setBallHeight] = useState(0);
  const [balls, setBalls] = useState<ballInfo[]>([
    { posX: 50, posY: 50, dirX: 0 },
    { posX: 50, posY: 50, dirX: 0 },
  ]);
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
    { bottom: 0, top: 0, left: 0, right: 0 },
    { bottom: 0, top: 0, left: 0, right: 0 },
  ]);
  const [rightPaddleRects, setRightPaddleRects] = useState<
    paddleRectProperties[]
  >([
    { bottom: 0, top: 0, left: 0, right: 0 },
    { bottom: 0, top: 0, left: 0, right: 0 },
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

  const leftPaddleSetter = (index: number, leftPaddleRect: DOMRect) => {
    setLeftPaddleRects((prevValue) => {
      let ArrayCopy = [...prevValue];
      ArrayCopy[index] = leftPaddleRect;
      return ArrayCopy;
    });
  };

  const rightPaddleSetter = (index: number, rightPaddleRect: DOMRect) => {
    setRightPaddleRects((prevValue) => {
      let ArrayCopy = [...prevValue];
      ArrayCopy[index] = rightPaddleRect;
      return ArrayCopy;
    });
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

  const setBallHeightHelper = (isPlayer: boolean) => {
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

  React.useEffect(() => {
    //need to add a check for is frozen
    //first lets get a list ordered by closeness of balls of the ball heights
    let playerBallHeightArray = setBallHeightHelper(true).slice(
      0,
      leftPaddleRects.length
    );
    //create array of objects to track relationship between balls and paddles note top and bottom of rects must be divided by outerheight and multiplied by 100 to convert to relative position like ball uses
    let playerPaddleObjects: paddleBallMapping[] = leftPaddleRects.map(
      (value, leftPaddleRectsIndex) => {
        return {
          top: (value.top / window.innerHeight) * 100, //should this be inner or outter...???
          bottom: (value.bottom / window.innerHeight) * 100,
          hasBeenUsed: false,
          mapToPlayerBallHeightArray: null,
          mapToLeftPadddleRects: leftPaddleRectsIndex,
        };
      }
    );
    playerBallHeightArray.forEach((ballHeight, indexOfBallHeight) => {
      //just sort the playerBall objects array and give front most object next ball assignment
      playerPaddleObjects.sort((a, b) => {
        //if already been used go to the back
        if (a.hasBeenUsed && b.hasBeenUsed) {
          return 0;
        }
        if (a.hasBeenUsed) {
          return 1;
        }
        if (b.hasBeenUsed) {
          return -1;
        }

        //which rect is closer to the ball?
        let closestA =
          Math.abs(a.top - ballHeight) < Math.abs(a.top - ballHeight)
            ? Math.abs(a.top - ballHeight)
            : Math.abs(a.top - ballHeight);
        let closestB =
          Math.abs(b.top - ballHeight) < Math.abs(b.top - ballHeight)
            ? Math.abs(b.top - ballHeight)
            : Math.abs(b.top - ballHeight);
        if (closestA == closestB) {
          return 0;
        } else if (closestA < closestB) {
          return -1;
        } else {
          return 1;
        }
      });
      playerPaddleObjects[0].hasBeenUsed = true;
      playerPaddleObjects[0].mapToPlayerBallHeightArray = indexOfBallHeight;
    });
    console.log(
      "player paddle objects",
      playerPaddleObjects,
      playerBallHeightArray
    );
    let playerBallHeightArrayFinal = playerPaddleObjects
      .sort((a, b) => {
        if (
          a.mapToLeftPadddleRects == null &&
          b.mapToLeftPadddleRects == null
        ) {
          return 0;
        }
        if (a.mapToLeftPadddleRects == null) {
          return 1;
        }
        if (b.mapToLeftPadddleRects == null) {
          return -1;
        }
        return a.mapToLeftPadddleRects > b.mapToLeftPadddleRects ? 1 : -1;
      })
      .map((value) =>
        value.mapToPlayerBallHeightArray == null
          ? 50
          : playerBallHeightArray[value.mapToPlayerBallHeightArray]
      );
    console.log("playerBallHeightArrayFinal", playerBallHeightArrayFinal);
    setPlayerBallHeightsToUse(playerBallHeightArrayFinal);

    // playerBallHeightArray.forEach((ballHeight) => {
    //   let indexToAssignHeightTo = -1
    //   playerBallHeightsToUse.forEach((previouslyAssignedBallHeight, index) => {
    //     if(previouslyAssignedBallHeight != null)
    //     {

    //     }
    //   })
    // })

    // setPlayerBallHeightsToUse(setBallHeightHelper(true))

    setAIBallHeightsToUse(setBallHeightHelper(false));
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
      navigate("/result", { state: health });
    }
  }, [health]);

  return (
    <div className={styles.ActiveGame} data-testid="ActiveGame">
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
            delta={delta}
            ballHeight={AIBallHeightsToUse[rectIndex]}
            rightPaddleSetter={rightPaddleSetter}
            backgroundColor={rightPaddleColor[rectIndex]}
            key={"AIPaddle" + rectIndex}
          />
        );
      })}

      {leftPaddleRects.map((rect, rectIndex) => {
        return (
          <PlayerPaddle
            stats={playerStats}
            count={count}
            paddleIndex={rectIndex}
            delta={delta}
            ballHeight={playerBallHeightsToUse[rectIndex]}
            leftPaddleSetter={leftPaddleSetter}
            backgroundColor={leftPaddleColor[rectIndex]}
            key={"PlayerPaddle" + rectIndex}
          />
        );
      })}

      <Hud health={health}></Hud>
    </div>
  );
};

export default ActiveGame;
