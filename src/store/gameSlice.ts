import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { teamStats, metaProgression, commonStats } from "../interface/stats";
import { getEnemyStats } from "../levels/levels";

interface GameState {
  level: number;
  playerStats: teamStats;
  aiStats: teamStats;
  commonStats: commonStats;
  meta: metaProgression;
}

const initialState: GameState = {
  level: 1,
  playerStats: {
    health: 3,
    overheatChance: 50,
    overheatLength: 3000,
    speed: 0.03,
    numPaddles: 1,
  },
  aiStats: getEnemyStats(1),
  commonStats: { numBalls: 1 },
  meta: { money: 0 },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    advanceLevel(state) {
      console.log("I am being called to increment state");
      state.level += 1;
      state.aiStats = getEnemyStats(state.level);
    },
    updatePlayerStats(state, action: PayloadAction<Partial<teamStats>>) {
      state.playerStats = { ...state.playerStats, ...action.payload };
    },
    updateMeta(state, action: PayloadAction<Partial<metaProgression>>) {
      state.meta = { ...state.meta, ...action.payload };
    },
    resetGame(state) {
      return initialState;
    },
  },
});

export const { advanceLevel, updatePlayerStats, updateMeta, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
