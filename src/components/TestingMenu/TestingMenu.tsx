import React, { FC, useState } from 'react';
import styles from './TestingMenu.module.scss';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { stats } from '../../interface/stats';
import Grid2 from '@mui/material/Unstable_Grid2';
import { red } from '@mui/material/colors';
import { sides, sliderColors } from '../../util/enums';
import { Link } from 'react-router-dom';

interface TestingMenuProps {}


const TestingMenu: FC<TestingMenuProps> = () => {
  const sliderDefaultValues = {health: {max : 10, min: 1, step : 1, default:3}, overheatChance: {max: 100, min: 1, step:1,  default:20}, overheatLength: {max : 5000, min:100, step: 100, default: 1000}, speed: {max: 1 , min : .01, step:.01, default:.3}}

  const[playerStats, setPlayerStats]=useState<stats>(    {health: sliderDefaultValues.health.default,
    overheatChance:  sliderDefaultValues.overheatChance.default,
    overheatLength:  sliderDefaultValues.overheatLength.default,
    speed:  sliderDefaultValues.speed.default});

    const[aiStats, setAiStats]=useState<stats>(     {health: sliderDefaultValues.health.default,
      overheatChance:  sliderDefaultValues.overheatChance.default,
      overheatLength:  sliderDefaultValues.overheatLength.default,
      speed:  sliderDefaultValues.speed.default});

    const handlePlayerChange = (event: Event, newSpeed: number | number[]) => {
      if(event.target){
      const property = (event.target as HTMLButtonElement).name
      const updatedObject = {[property] : newSpeed}
      setPlayerStats((prevValue) => ( {...prevValue, ...updatedObject }));
    }
  }

    const handleAIChange = (event: Event, newSpeed: number | number[]) => {
      if(event.target){
      const property = (event.target as HTMLButtonElement).name
      const updatedObject = {[property] : newSpeed}
      setAiStats((prevValue) => ( {...prevValue, ...updatedObject }));
    }
  }

const sliderCreator = function (statsObject :stats, changeHandler : any, side : sides){
  return Object.keys(statsObject).map(function (key){
    let value = statsObject[key as keyof stats]
    return (
    <Grid2 key={`${side} ${key}`} xs={2}>
    <div>{key}</div>
    <Slider
    aria-label={key}
    value={value}
    valueLabelDisplay="auto"
    onChange={changeHandler}
    step={sliderDefaultValues[key as keyof typeof sliderDefaultValues].step}
    marks
    min={sliderDefaultValues[key as keyof typeof sliderDefaultValues].min}
    max={sliderDefaultValues[key as keyof typeof sliderDefaultValues].max}
    name={key}
    sx={{color:sliderColors[side]}}
  />
  <div>{value}</div>
  </Grid2>
    )
  })
}

const playerSliders = sliderCreator(playerStats, handlePlayerChange, sides.player)
const aiSliders = sliderCreator(aiStats, handleAIChange, sides.ai)
  



  return(
    
  <div className={styles.TestingMenu} data-testid="TestingMenu">
    <h3>Set Player ({sliderColors.player}) and AI Stats ({sliderColors.ai})</h3>
     <Grid2 container spacing={2}>
     {playerSliders}
      </Grid2>

      <Grid2 container spacing={2} color={red}>
     {aiSliders}
      </Grid2>
      <Link to={`game`} state={{ aiStats: aiStats, playerStats: playerStats}}><Button variant="contained">Play!</Button></Link>
  </div>
);
}

export default TestingMenu;
