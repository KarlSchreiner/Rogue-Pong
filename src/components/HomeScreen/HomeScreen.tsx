import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  GlitchTitle,
  FadeInStack,
  NeonButton,
  StyledLink,
} from "./HomeScreen.styled";

// Example placeholder stats
const aiStats = {
  health: 1,
  overheatChance: 0.2,
  overheatLength: 3,
  speed: 0.5,
  numPaddles: 1,
};

const playerStats = {
  health: 3,
  overheatChance: 0.1,
  overheatLength: 2,
  speed: 1,
  numPaddles: 1,
};

const commonStats = {
  ballSpeed: 7,
};

const HomeScreen: React.FC = () => {
  return (
    <Container>
      <FadeInStack spacing={5} alignItems="center">
        <GlitchTitle variant="h2">Rogue Pong</GlitchTitle>

        <StyledLink
          to="/game"
          state={{
            aiStats,
            playerStats,
            commonStats,
          }}
        >
          <NeonButton variant="outlined" size="large">
            Play
          </NeonButton>
        </StyledLink>
      </FadeInStack>
    </Container>
  );
};

export default HomeScreen;
