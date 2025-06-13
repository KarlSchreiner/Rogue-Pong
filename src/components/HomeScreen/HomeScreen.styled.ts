import styled, { keyframes } from "styled-components";
import { Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

// Animations
const glitch = keyframes`
  0% { text-shadow: 2px 2px #ff00c8, -2px -2px #00ff95; }
  20% { text-shadow: -2px 2px #ff00c8, 2px -2px #00ff95; }
  40% { text-shadow: 2px -2px #ff00c8, -2px 2px #00ff95; }
  60% { text-shadow: 4px 4px #ff00c8, -4px -4px #00ff95; }
  80% { text-shadow: -1px 1px #ff00c8, 1px -1px #00ff95; }
  100% { text-shadow: 2px 2px #ff00c8, -2px -2px #00ff95; }
`;

const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`;

// Styled Components
export const Container = styled.div`
  min-height: 100vh;
  background-color: #0d0d0d;
  color: #00ffe7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const GlitchTitle = styled(Typography)`
  font-weight: 700;
  animation: ${glitch} 1s infinite;
  text-shadow: 2px 2px #ff00c8, -2px -2px #00ff95;
`;

export const FadeInStack = styled(Stack)`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
`;

export const NeonButton = styled(Button)`
  color: #00ffe7;
  border: 2px solid #00ffe7;
  border-radius: 8px;
  padding: 10px 30px;
  font-weight: bold;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px #00ffe7;

  &:hover {
    background-color: #00ffe7;
    color: #0d0d0d;
    box-shadow: 0 0 20px #00ffe7;
    transform: scale(1.05);
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
`;
