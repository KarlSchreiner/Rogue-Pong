// import React, { Component, useEffect } from 'react';
// import styles from './Ball.module.scss';

// interface BallProps {}

// const INITIAL_VELOCITY = .025;
// const VELOCITY_INCREASE = .00001;

// class Ball extends React.Component<BallProps>{
  
//   position = {x: 50, y: 50}

//   componentDidMount(): void {
//     elem = document.getElementById('')
//   }

//   // const [position, setPosition] = React.useState({x: 50, y: 50});
//   // useEffect(() => {
//   //   console.log("plz ")
//   // }, [])


//   // rect () {

//   //   return document

//   // }

//   render() {
//     return(
//     <div className={styles.Ball} data-testid="Ball" style={"left" : this.position.x}>
//       Ball Component {this.position.x}
//     </div>
//     )
//   }
// };

// export default Ball;

import React, { Component, FC, useEffect, useRef } from 'react';
import styles from './Ball.module.scss';
import {sides } from '../../util/enums';

interface BallProps {
  id : number
  ballHeightSetter: any
  count: number
  delta: number
  leftPaddles: any[]
  rightPaddles: any[]
  healthSetter: (numChanged :  number, who : sides) => void
  // paddle: any
}

const INITIAL_VELOCITY = .025;
const VELOCITY_INCREASE = .00000625;
const MAX_VELOCITY = 0.25;

const Ball: FC<BallProps> = (BallProps) => {
  
  const [position, setPosition] = React.useState({x: 50, y: 50});
  const [direction, setDirection] = React.useState({x: 1, y: 0});
  const [velocity, setVelocity] = React.useState(INITIAL_VELOCITY);

  // const [pointScoredButNotReset, setPointScoredButNotReset] = React.useState(false);

  const ballElemRef = useRef<HTMLInputElement>(null);



  React.useEffect(()=>{
      reset();
  }, [] )

  React.useEffect(()=>{
    update(BallProps.delta)
  }, [BallProps.count])

  React.useEffect(() => {
    BallProps.ballHeightSetter(position.y)
  }, [position.y]) 

  //apply default positioning of the ball and send it in a random direction
  function reset() {
    setPosition({x: 50, y: 50});
    let tempDirection = {x: 0, y: 0}
    while (Math.abs(tempDirection.x) <= .2 || Math.abs(tempDirection.x) >= .9) {
        const heading = randomNumberBetween(0, 2 * Math.PI)
        tempDirection = {x: Math.cos(heading), y: Math.sin(heading)}
    }
    setDirection(tempDirection);
    setVelocity(INITIAL_VELOCITY)
  }

  function checkIfPointScored(ballRect: any) {
    return (ballRect.right >= window.innerWidth || ballRect.left <= 0)
  }

  function handlePointScored(ballRect: any) {
    // if (ballRect.right >= window.innerWidth) {
    //     //playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    //     console.log("PLAYER SCORRRRRREEEDDDD WOOOOOOOOOOO!")
    // }
    // else {
    //     //computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    //     console.log("ai has been pointed oof criiiiiinge... :(")
    // }
    // if(!pointScoredButNotReset)
    // {
      
      reset()
      BallProps.healthSetter(1,  (ballRect.right >= window.innerWidth) ? sides.ai: sides.player)
      
    // }

    
}

  function update(delta: number, /*paddleRects: any*/) {
    setPosition({x: position.x + (direction.x * velocity * delta), y: position.y + (direction.y * velocity * delta)});
    setVelocity(Math.min(velocity + (VELOCITY_INCREASE * delta), MAX_VELOCITY));
    // if(Math.min(velocity + (VELOCITY_INCREASE * delta), MAX_VELOCITY) >= MAX_VELOCITY)
    // {
    //   console.log("max velocity reached for ball...............");
    // }
    if(ballElemRef.current)
    {
      
      // console.log("this the ball elem", ballElemRef.current.getBoundingClientRect())



      const ballRect = ballElemRef.current.getBoundingClientRect()
      // const rect = BallProps.rightPaddles[0].getBoundingClientRect();
      // console.log("the box", rect)

      if (ballRect.top <= 0) {
        setDirection({x: direction.x, y: Math.abs(direction.y)})
      }

      if (ballRect.bottom >= window.innerHeight) {
        setDirection({x: direction.x, y: Math.abs(direction.y) * -1})
      }

      //todo: make this work with paddles
      //pass two arays paddle on the left and paddle on the right 
      if (BallProps.rightPaddles.some(r => isCollision(r, ballRect))) {
          setDirection({x: Math.abs(direction.x) * -1, y: direction.y})
          //todo make sure it don't glitch out and just positive or negative for enemy 
      }

      if (BallProps.leftPaddles.some(r => isCollision(r, ballRect))) {
        setDirection({x: Math.abs(direction.x), y: direction.y})
        //todo make sure it don't glitch out and just positive or negative for enemy 
      }
      //handle this ball scoring a point
      if (checkIfPointScored(ballRect)) {
          handlePointScored(ballRect)
      }
    }

  }

  function randomNumberBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function isCollision(rect1: any, rect2: any) {
    if(!rect1 || ! rect2)
    {
      return false;
    }
    // todo: make this work with paddles
    return (rect1.left <= rect2.right &&
        rect1.right >= rect2.left
        && rect1.top <= rect2.bottom
        && rect1.bottom >= rect2.top)
  }

  return(
  <div ref={ballElemRef} className={styles.Ball} data-testid="Ball" style={{left: `${position.x}vw`, top: `${position.y}vh`}} id={`Ball${(BallProps.id)}`} >
  </div>
  )
};

export default Ball;

