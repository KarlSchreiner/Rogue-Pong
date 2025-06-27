import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import styled from "styled-components";
import { teamStats } from "../../interface/stats";

// All available upgrades
const allUpgradeOptions = [
  {
    name: "Extra Paddle",
    description: "Adds one more paddle",
    statKey: "numPaddles" as keyof teamStats,
    increment: 1,
  },
  {
    name: "Health Boost",
    description: "Increases your health by 1",
    statKey: "health" as keyof teamStats,
    increment: 1,
  },
  {
    name: "Speed Increase",
    description: "Improves paddle speed",
    statKey: "speed" as keyof teamStats,
    increment: 0.02,
  },
  {
    name: "Overheat Resistance",
    description: "Decreases overheat chance",
    statKey: "overheatChance" as keyof teamStats,
    increment: -0.05,
  },
  {
    name: "Faster Cooldown",
    description: "Shortens overheat duration",
    statKey: "overheatLength" as keyof teamStats,
    increment: -200,
  },
  {
    name: "Zombie Paddle",
    description: "Aimlessley goes up and down",
    statKey: "numZombiePaddles" as keyof teamStats,
    increment: 1,
  },
];

const getRandomUpgrades = (count: number) => {
  const shuffled = [...allUpgradeOptions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const DisabledCard = styled(Card)<{ disabled?: boolean }>`
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  transition: opacity 0.2s ease-in-out;
`;

const UpgradeButton = styled(Button)<{ selected?: boolean }>`
  background-color: ${(props) =>
    props.selected
      ? "rgb(25, 118, 210) !important"
      : "rgba(255, 255, 255, 0.1) !important"};
  color: ${(props) => (props.selected ? "#fff !important" : "#aaa !important")};
  border: ${(props) =>
    props.selected ? "1px solid rgb(25, 118, 210)" : "1px solid #555"};

  &:hover {
    background-color: rgb(25, 118, 210) !important;
  }
`;

interface UpgradeShopProps {
  onSelect: (upgrade: { statKey: keyof teamStats; increment: number }) => void;
}

const UpgradeShop: React.FC<UpgradeShopProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [options, setOptions] = useState<typeof allUpgradeOptions>([]);

  useEffect(() => {
    setOptions(getRandomUpgrades(3));
  }, []);

  const handleSelect = (index: number) => {
    const upgrade = options[index];
    setSelected(index);
    onSelect(upgrade);
  };

  return (
    <Grid container spacing={2} justifyContent="center" mt={2}>
      {options.map((option, idx) => (
        <Grid item key={option.name}>
          <DisabledCard disabled={selected !== null && selected !== idx}>
            <CardContent>
              <Typography variant="h6">{option.name}</Typography>
              <Typography variant="body2" gutterBottom>
                {option.description}
              </Typography>
              <UpgradeButton
                variant="contained"
                onClick={() => handleSelect(idx)}
                selected={selected === idx}
              >
                {selected === idx ? "Selected" : "Select"}
              </UpgradeButton>
            </CardContent>
          </DisabledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default UpgradeShop;
