import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PongPaddle from './PongPaddle';

describe('<PongPaddle />', () => {
  test('it should mount', () => {
    render(<PongPaddle />);
    
    const pongPaddle = screen.getByTestId('PongPaddle');

    expect(pongPaddle).toBeInTheDocument();
  });
});