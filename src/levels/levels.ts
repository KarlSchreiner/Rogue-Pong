import { teamStats } from "../interface/stats";

// Define the stats for each level
const levelEnemyStats: Record<number, teamStats> = {
  1: {
    health: 1,
    overheatChance: 0.4,
    overheatLength: 5000,
    speed: 0.03,
    numPaddles: 1,
    numZombiePaddles: 0,
  },
  2: {
    health: 3,
    overheatChance: 0.2,
    overheatLength: 3000,
    speed: 0.03,
    numPaddles: 1,
    numZombiePaddles: 1,
  },
  3: {
    health: 5,
    overheatChance: 0.1,
    overheatLength: 1000,
    speed: 0.05,
    numPaddles: 2,
    numZombiePaddles: 0,
  },
  // Add more levels as needed
};

// Export function to get stats for a given level
export const getEnemyStats = (level: number): teamStats => {
  return levelEnemyStats[level] ?? levelEnemyStats[1]; // fallback to level 1
};

// Optional: export full map if you ever need it
export default levelEnemyStats;
