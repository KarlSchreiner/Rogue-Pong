import React from 'react';
import logo from './logo.svg';
import './App.css';
import Ball from './components/Ball/Ball';
import ActiveGame from './components/ActiveGame/ActiveGame';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TestingMenu from './components/TestingMenu/TestingMenu';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TestingMenu/>,
  },
  {
    path: "/game",
    element: <ActiveGame/>,
  },
]);



function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
     
    </div>
  );
}

export default App;
