import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Paddle from './Paddle';

describe('<Paddle />', () => {
  test('it should mount', () => {
    // render(<Paddle />);
    
    const paddle = screen.getByTestId('Paddle');

    expect(paddle).toBeInTheDocument();
  });
});