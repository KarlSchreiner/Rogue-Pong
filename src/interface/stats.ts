export interface teamStats {
  health: number;
  overheatChance: number;
  overheatLength: number;
  speed: number;
  numPaddles: number;
}
export interface commonStats {
  numBalls: number;
}
export interface healthInterface {
  playerHealth: number;
  aiHealth: number;
}
export interface metaProgression {
  money: number;
  // playerStats: teamStats;
}
