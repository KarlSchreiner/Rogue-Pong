import styled from "styled-components";

export const HudWrapper = styled.div`
  display: flex;
  flex-direction: row;

  // Optional styling from the commented SCSS
  // justify-content: center;
  // font-weight: bold;
  // font-size: 7vh;
  // color: var(--foreground-color);

  & > * {
    flex-grow: 1;
    flex-basis: 0;
    padding: 0 2vh;
    margin: 1vh 0;
  }
`;
