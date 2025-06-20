import React, { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { advanceLevel, upgradePlayerStat } from "../../store/gameSlice";
import { GameContainer } from "./ResultsScreen.styled";
import UpgradeShop from "../UpgradeShop/UpgradeShop";
import { healthInterface, teamStats } from "../../interface/stats";
import levelEnemyStats from "../../levels/levels";

const ResultsScreen: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const health = (location.state as healthInterface) ?? {
    playerHealth: 0,
    aiHealth: 0,
  };
  const playerWon = health.playerHealth > health.aiHealth;
  const gameStats = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const [selectedUpgrade, setSelectedUpgrade] = useState<{
    statKey: keyof teamStats;
    increment: number;
  } | null>(null);

  const handleNextLevel = () => {
    let updatedPlayerStats = { ...gameStats.playerStats };
    let updatedAiStats = levelEnemyStats[gameStats.level + 1];
    if (selectedUpgrade) {
      updatedPlayerStats[selectedUpgrade.statKey] += selectedUpgrade.increment;
      dispatch(upgradePlayerStat(selectedUpgrade));
    }
    dispatch(advanceLevel());

    navigate("/game", {
      state: {
        aiStats: updatedAiStats,
        playerStats: updatedPlayerStats,
        commonStats: gameStats.commonStats,
      },
    });
  };

  return (
    <GameContainer>
      {playerWon && (
        <UpgradeShop onSelect={(upgrade) => setSelectedUpgrade(upgrade)} />
      )}
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextLevel}
                  disabled={!selectedUpgrade}
                >
                  Play Next Level
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </GameContainer>
  );
};

export default ResultsScreen;
