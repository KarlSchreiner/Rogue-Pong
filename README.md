# Rogue Pong

POOOOOOOOOOOOOOOOOOOOOOOOOONG

This is the first ever fully React based Pong Game.

The vision for this game is a rogue-like upgrade driven experience.

Currently the Front end is implemented with a fully functional Pong experience all within React.

We plan on adding significantly more powerups and upgrades, creating a rogue-like experience where you purchase (hopefully synergistic) upgrades as you earn money from beating harder and harder opponents. We also will add a backend to store and serve player progress, AI opponents, and what upgrades can be purchased from the shop.

Expected release is late 2025!

## Tickets

- Remove anys
- standardize aiVar names
- Have redux store be read in game loop instead of being read when calling game loop and passed as location vars
- implement a powerup
- implemnet an upgrade
- Implement a backend
  - need to store currently held upgrades, money, and in game time of user (planning on hosting a speedrunning tournament late 2025 with cash bounty)
  - need to present next AI opponent's stats as well as rewards
  - send 3 random upgrades which the user can potentially buy this round
- paddle moves slowly up and down when it cannot be mapped to a second ball
- change component name to have .component
- institute more powerups
- institute meta progression
- if there are two paddles whichever paddle is closest to the ball should snap onto the ball rather than there being just 1 paddle which is in use

## powerup ideas

- regenerating health -> if player uses this the player would need to sit still. If the ai used this it would be cool for a boss

- we could put objects in the middle. likely will get stuck and bounce around for a bit. That's a feature.

- click power ups to drive player engagmenet

## upgrade ideas

- it's a shop where the upgrades are random

- custom enemey sound for each enemey

- width of paddle

- money printer upgrade-- prints coins on screen when ball hits coin you get upgrade money printer to get more coins

- slow down region //continuos
- hole in paddle // activated lasts x seconds // how long it stays and how many uses

- spawn in more balls
- One sided balls

- zombie paddle
- stationary paddle //potentially has health

- Maybe you are shown three possible oponents with varyying rewards and you can pick one

- //sound effect of ball colliding is piano noise but speed of ball changes pitch

# meta progression system

- possibility of having more starting money
- can choose / bias which upgrade are in the shop
- can just have some upgrades out the gate
- more random options to choose from
- get a chance to do a reshuffle

## backend

- how close you made it or completion time

- game state how much money you have what round you are on what upgrades you have name of save

- get new upgrade choices endpoint

- purchased upgrade endpoint

- start round endpoint

- round end endpoint

## useful links

- https://css-tricks.com/using-requestanimationframe-with-react-hooks/

## Dev Commands

- Create new React Component in the components folder: `npx generate-react-cli component <TypeComponentNameHere>`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
