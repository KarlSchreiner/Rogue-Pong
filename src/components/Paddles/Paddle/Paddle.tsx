import React, { FC, useEffect, Component, useRef } from 'react';
import styles from './Paddle.module.scss';
import { stats } from '../../../interface/stats';

//sound imports
import useSound from 'use-sound';
const overheatSoundImport = require('./overheat.mp3')


interface PaddleProps {
  paddleSetter : any //todo figure out typescript with functions!!!!!
  count: number;
  paddleIndex: number;
  delta: number;
  ballHeight: number;
  stats : stats;
  backgroundColor : string
}

const maxDirectionInfluence = 0.666;

const Paddle: FC<PaddleProps> = (PaddleProps) => {
  const [position, setPosition] = React.useState(50);
  const [localOverheatValues, setLocalOverheatValues] = React.useState({localOverheatedTimer : 0, isOverheated: false})
  const [backgroundColor, setBackgroundColor] = React.useState(PaddleProps.backgroundColor)
  const [overheatSound, overheatSoundExposed] = useSound(overheatSoundImport)

  useEffect(()=> {
    if(localOverheatValues.localOverheatedTimer >= PaddleProps.stats.overheatLength){
      const isWrongWay = (1 === Math.floor(Math.random()*PaddleProps.stats.overheatChance))
      setLocalOverheatValues({isOverheated: isWrongWay , localOverheatedTimer: 0 })
      setBackgroundColor(isWrongWay ? "red" : PaddleProps.backgroundColor)
    }
    else {
      setLocalOverheatValues((prevValue)=>({...prevValue, localOverheatedTimer: prevValue.localOverheatedTimer+PaddleProps.delta }))
    }

    //should leave the screen even if going wrogn way. NEED TO GIVE IT ACCELERATION
    const direction = (PaddleProps.ballHeight - position) > maxDirectionInfluence || (PaddleProps.ballHeight - position) < -maxDirectionInfluence ? Math.sign((PaddleProps.ballHeight - position)) * maxDirectionInfluence : (PaddleProps.ballHeight - position);
    let newPosition = position + (PaddleProps.stats.speed * PaddleProps.delta * direction) * (localOverheatValues.isOverheated ? 0 : 1)

    //prevent the paddle from overshooting the ball repeatedly, which fixes jittering on lower refresh rate screens
    if(!localOverheatValues.isOverheated && ((newPosition > PaddleProps.ballHeight && PaddleProps.ballHeight > position) || (newPosition < PaddleProps.ballHeight && PaddleProps.ballHeight < position)))
    {
      newPosition = PaddleProps.ballHeight
    }
   
    // const newPosition = position + (PaddleProps.stats.speed * PaddleProps.delta *  (PaddleProps.ballHeight - position)) 
    setPosition (newPosition)
  }, [PaddleProps.count])

  useEffect(()=>{
    console.log("color changed");
    if(backgroundColor == "red"){
      overheatSound()
    }
    else{
      overheatSoundExposed.stop()
    }
  }, [backgroundColor])

  const paddleRef = useRef<HTMLInputElement>(null);

  useEffect(() =>{
    setPosition(position);
    if(paddleRef.current)
    {
      
      PaddleProps.paddleSetter(PaddleProps.paddleIndex, paddleRef.current.getBoundingClientRect())
    }
  }, [position])


  return(
  <div ref={paddleRef} className={styles.Paddle} data-testid="Paddle" style={{top: `${position}vh`, backgroundColor: backgroundColor}}>
  </div>)
};

export default Paddle;
