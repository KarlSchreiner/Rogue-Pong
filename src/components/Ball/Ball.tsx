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

import React, { Component, FC, useEffect } from 'react';
import styles from './Ball.module.scss';

interface BallProps {
  id : number
  callUpdate : number
}

const INITIAL_VELOCITY = .025;
const VELOCITY_INCREASE = .00001;
let count = 0 

const Ball: FC<BallProps> = (BallProps) => {
  
  const [position, setPosition] = React.useState({x: 50, y: 50});
  const [direction, setDirection] = React.useState({x: 1, y: 0});
  const [velocity, setVelocity] = React.useState(INITIAL_VELOCITY);

  let elem: HTMLElement | null;
  React.useEffect(()=>{
      elem = document.getElementById("ball"+BallProps.id);
      reset();
  }, [] )

  React.useEffect(()=>{
    update(BallProps.callUpdate, 0)
  }, [BallProps.callUpdate])


  function reset() {
    setPosition({x: 50, y: 50});
    let tempDirection = {x: 0, y: 0}
    while (Math.abs(tempDirection.x) <= .2 || Math.abs(tempDirection.x) >= .9) {
        const heading = randomNumberBetween(0, 2 * Math.PI)
        tempDirection = {x: Math.cos(heading), y: Math.sin(heading)}
        console.log("look here", heading, tempDirection.x)
    }
    setDirection(tempDirection);
    setVelocity(INITIAL_VELOCITY)
  }


  function update(delta: number, paddleRects: any) {
    console.log("our update function is being called")
    setPosition({x: position.x + (direction.x * velocity * delta), y: position.y + (direction.y * velocity * delta)});
    setVelocity(velocity + (VELOCITY_INCREASE * delta))
    if(elem)
    {
      const rect = elem.getBoundingClientRect();

      if (rect.bottom >= window.innerHeight || rect.top <= 0) {
        setDirection({x: direction.x, y: direction.y * -1})
      }

      //todo: make this work with paddles
      // if (paddleRects.some(r: Boolean => isCollision(r, rect))) {
      //     setDirection({x: direction.x * -1, y: direction.y})
      //     //todo make sure it don't glitch out and just positive or negative for enemy 
      // }
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
    //todo: make this work with paddles
    // return (rect1.left <= rect2.right &&
    //     rect1.right >= rect2.left
    //     && rect1.top <= rect2.bottom
    //     && rect1.bottom >= rect2.top)
  }

  return(
  <div className={styles.Ball} data-testid="Ball" style={{left: `${position.x}vw`, top: `${position.y}vh`}} id={`Ball${(BallProps.id)}`} >
  </div>
  )
};

export default Ball;

