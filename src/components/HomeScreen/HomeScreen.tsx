import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  GlitchTitle,
  FadeInStack,
  NeonButton,
  StyledLink,
} from "./HomeScreen.styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { resetGame } from "../../store/gameSlice";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const gameStats = useSelector((state: RootState) => state.game);

  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

  return (
    <Container>
      <FadeInStack spacing={5} alignItems="center">
        <GlitchTitle variant="h2">Rogue Pong</GlitchTitle>

        <StyledLink
          to="/game"
          state={{
            aiStats: gameStats.aiStats,
            playerStats: gameStats.playerStats,
            commonStats: gameStats.commonStats,
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
