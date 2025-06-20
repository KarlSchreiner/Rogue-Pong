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
    overheatChance: 0.5,
    overheatLength: 1000,
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
      state.level += 1;
      console.log(`current level is ${state.level}`);
      state.aiStats = getEnemyStats(state.level);
    },
    updatePlayerStats(state, action: PayloadAction<Partial<teamStats>>) {
      state.playerStats = { ...state.playerStats, ...action.payload };
    },
    updateMeta(state, action: PayloadAction<Partial<metaProgression>>) {
      state.meta = { ...state.meta, ...action.payload };
    },
    upgradePlayerStat: (
      state,
      action: PayloadAction<{ statKey: keyof teamStats; increment: number }>
    ) => {
      const { statKey, increment } = action.payload;
      state.playerStats[statKey] += increment;
    },

    resetGame(state) {
      return initialState;
    },
  },
});

export const {
  advanceLevel,
  updatePlayerStats,
  updateMeta,
  resetGame,
  upgradePlayerStat,
} = gameSlice.actions;

export default gameSlice.reducer;
