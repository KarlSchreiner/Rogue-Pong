import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Ball from "./components/Ball/Ball";
import ActiveGame from "./components/ActiveGame/ActiveGame";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TestingMenu from "./components/TestingMenu/TestingMenu";
import ResultsScreen from "./components/ResultsScreen/ResultsScreen";
import HomeScreen from "./components/HomeScreen/HomeScreen";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `"Orbitron", sans-serif`,
    h1: {
      fontFamily: `"Orbitron", sans-serif`,
    },
    button: {
      fontFamily: `"Orbitron", sans-serif`,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/debug",
    element: <TestingMenu />,
  },
  {
    path: "/game",
    element: <ActiveGame />,
  },
  {
    path: "/result",
    element: <ResultsScreen />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
