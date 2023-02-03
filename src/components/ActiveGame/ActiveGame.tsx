import React, { FC, useState } from 'react';
import Ball from '../Ball/Ball';
import AIPaddle from '../Paddles/AIPaddle/AIPaddle';
import Paddle from '../Paddles/Paddle/Paddle';
import styles from './ActiveGame.module.scss';

interface ActiveGameProps {}



const ActiveGame: FC<ActiveGameProps> = () => {
  // console.log("re-rendered lmao")

  const [count, setCount] = useState(0);
  const [delta, setDelta] = useState(0);
  const [ballHeight, setBallHeight] = useState(0);



  const ballHeightSetter = (ballHeight : number) => {
    setBallHeight(ballHeight)
  }
  // const handleIncrease = () => {
  //   setCount(count + 1);
  // };


  React.useEffect(()=>{
    let frameId: number;
    let lastTime : number | undefined;
    
    
    const updateFunction =  (time: number)  => {
      const currentTime = time
      
      if(lastTime){
        const delta = currentTime - lastTime
        setCount(prevCount => prevCount + 1);
        setDelta(delta);

        // if (isLose()) {

        //     handleLose()
        // }
      }

      lastTime = currentTime
      frameId = requestAnimationFrame(updateFunction)
      
     
    }
    requestAnimationFrame(updateFunction)
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
  <div className={styles.ActiveGame} data-testid="ActiveGame">
     <Ball id={0} count={count} delta={delta} ballHeightSetter={ballHeightSetter}></Ball>
     <AIPaddle count={count} delta={delta} ballHeight={ballHeight}></AIPaddle>
  </div>)
};

export default ActiveGame;
