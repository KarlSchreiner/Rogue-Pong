import React, { FC, useState } from "react";
import styles from "./TestingMenu.module.scss";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { commonStats, teamStats } from "../../interface/stats";
import Grid2 from "@mui/material/Unstable_Grid2";
import { red } from "@mui/material/colors";
import { sides, sliderColors } from "../../util/enums";
import { Link } from "react-router-dom";

interface TestingMenuProps {}

const TestingMenu: FC<TestingMenuProps> = () => {
  const sliderDefaultValues = {
    health: { max: 100, min: 1, step: 1, default: 3 },
    overheatChance: { max: 100, min: 1, step: 1, default: 20 },
    overheatLength: { max: 5000, min: 0, step: 100, default: 1000 },
    speed: { max: 1, min: 0.01, step: 0.01, default: 0.3 },
    numPaddles: { max: 10, min: 1, step: 1, default: 2 },
    numBalls: { max: 10, min: 1, step: 1, default: 2 },
  };

  const [playerStats, setPlayerStats] = useState<teamStats>({
    health: sliderDefaultValues.health.default,
    overheatChance: sliderDefaultValues.overheatChance.default,
    overheatLength: sliderDefaultValues.overheatLength.default,
    speed: sliderDefaultValues.speed.default,
    numPaddles: sliderDefaultValues.numPaddles.default,
  });

  const [aiStats, setAiStats] = useState<teamStats>({
    health: sliderDefaultValues.health.default,
    overheatChance: sliderDefaultValues.overheatChance.default,
    overheatLength: sliderDefaultValues.overheatLength.default,
    speed: sliderDefaultValues.speed.default,
    numPaddles: sliderDefaultValues.numPaddles.default,
  });

  const [commonStats, setCommonStats] = useState<commonStats>({
    numBalls: sliderDefaultValues.numBalls.default,
  });

  const handlePlayerChange = (event: Event, newSpeed: number | number[]) => {
    if (event.target) {
      const property = (event.target as HTMLButtonElement).name;
      const updatedObject = { [property]: newSpeed };
      setPlayerStats((prevValue) => ({ ...prevValue, ...updatedObject }));
    }
  };

  const handleAIChange = (event: Event, newSpeed: number | number[]) => {
    if (event.target) {
      const property = (event.target as HTMLButtonElement).name;
      const updatedObject = { [property]: newSpeed };
      setAiStats((prevValue) => ({ ...prevValue, ...updatedObject }));
    }
  };

  const handleCommonChange = (event: Event, newSpeed: number | number[]) => {
    if (event.target) {
      const property = (event.target as HTMLButtonElement).name;
      const updatedObject = { [property]: newSpeed };
      setCommonStats((prevValue) => ({ ...prevValue, ...updatedObject }));
    }
  };

  const sliderCreator = function (
    statsObject: teamStats | commonStats,
    changeHandler: any,
    side: sides
  ) {
    return Object.keys(statsObject).map(function (key) {
      let teamCastedObject = statsObject as teamStats;
      let commonCastedObject = statsObject as commonStats;
      let value;
      if (teamCastedObject.health !== undefined) {
        value = teamCastedObject[key as keyof teamStats];
      } else {
        value = commonCastedObject[key as keyof commonStats];
      }
      // value = (statsObject as teamStats).numPaddles !== undefined ?  statsObject[key as keyof teamStats] : statsObject[key as keyof commonStats];
      return (
        <Grid2 key={`${side} ${key}`} xs={2}>
          <div>{key}</div>
          <Slider
            aria-label={key}
            value={value}
            valueLabelDisplay="auto"
            onChange={changeHandler}
            step={
              sliderDefaultValues[key as keyof typeof sliderDefaultValues].step
            }
            marks
            min={
              sliderDefaultValues[key as keyof typeof sliderDefaultValues].min
            }
            max={
              sliderDefaultValues[key as keyof typeof sliderDefaultValues].max
            }
            name={key}
            sx={{ color: sliderColors[side] }}
          />
          <div>{value}</div>
        </Grid2>
      );
    });
  };

  const playerSliders = sliderCreator(
    playerStats,
    handlePlayerChange,
    sides.player
  );
  const aiSliders = sliderCreator(aiStats, handleAIChange, sides.ai);

  const commonSliders = sliderCreator(
    commonStats,
    handleCommonChange,
    sides.common
  );

  return (
    <div className={styles.TestingMenu} data-testid="TestingMenu">
      <h3>
        Set Player ({sliderColors.player}) and AI Stats ({sliderColors.ai})
      </h3>
      <Grid2 container spacing={2}>
        {playerSliders}
      </Grid2>

      <Grid2 container spacing={2} color={red}>
        {aiSliders}
      </Grid2>

      <Grid2 container spacing={2}>
        {commonSliders}
      </Grid2>

      <Link
        to={`game`}
        state={{
          aiStats: aiStats,
          playerStats: playerStats,
          commonStats: commonStats,
        }}
      >
        <Button variant="contained">Play!</Button>
      </Link>
    </div>
  );
};

export default TestingMenu;
