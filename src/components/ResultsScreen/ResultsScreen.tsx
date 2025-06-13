import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { healthInterface } from "../../interface/stats";
import HealthDisplay from "../Hud/healthDisplay/healthDisplay";
import styles from "./ResultsScreen.module.scss";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { StyledLink } from "../HomeScreen/HomeScreen.styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { advanceLevel } from "../../store/gameSlice";
import { GameContainer } from "./ResultsScreen.styled";

interface ResultsScreenProps {}

const ResultsScreen: FC<ResultsScreenProps> = () => {
  const location = useLocation();
  const health = location.state
    ? (location.state as healthInterface)
    : ({ playerHealth: 0, aiHealth: 0 } as healthInterface);
  const playerWon = health.playerHealth > health.aiHealth;

  const dispatch = useDispatch();
  const gameStats = useSelector((state: RootState) => state.game);

  // useEffect(() => {
  //   if (playerWon) {
  //     dispatch(advanceLevel());
  //   }
  // }, [dispatch, playerWon]);

  return (
    <GameContainer>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card
          sx={{
            minWidth: 300,
            padding: 4,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: 6,
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Round Over
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Typography variant="h6">Player Health</Typography>
                <Typography variant="h5" color="primary">
                  {health.playerHealth}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">AI Health</Typography>
                <Typography variant="h5" color="error">
                  {health.aiHealth}
                </Typography>
              </Grid>
            </Grid>
            <Box mt={4}>
              {!playerWon && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => (window.location.href = "/")}
                >
                  Main Menu
                </Button>
              )}
              {playerWon && (
                <StyledLink
                  to="/game"
                  state={{
                    aiStats: gameStats.aiStats,
                    playerStats: gameStats.playerStats,
                    commonStats: gameStats.commonStats,
                  }}
                >
                  <Button variant="contained" color="primary">
                    Play Next Level
                  </Button>{" "}
                </StyledLink>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </GameContainer>
  );
};
export default ResultsScreen;
