import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import PlayerPaddle from './PlayerPaddle';

describe('<PlayerPaddle />', () => {
  test('it should mount', () => {
    // render(<PlayerPaddle />);
    
    const playerPaddle = screen.getByTestId('PlayerPaddle');

    expect(playerPaddle).toBeInTheDocument();
  });
});