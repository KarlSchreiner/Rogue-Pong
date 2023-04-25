import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { healthInterface } from "../../interface/stats";
import HealthDisplay from "../Hud/healthDisplay/healthDisplay";
import styles from "./ResultsScreen.module.scss";

interface ResultsScreenProps {}

const ResultsScreen: FC<ResultsScreenProps> = () => {
  const location = useLocation();
  console.log(location.state);
  const health = location.state as healthInterface;

  return (
    <div className={styles.ResultsScreen} data-testid="ResultsScreen">
      Player Health {health.playerHealth} AI Health {health.aiHealth}
    </div>
  );
};
export default ResultsScreen;
