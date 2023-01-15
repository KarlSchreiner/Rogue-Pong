import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PongBall from './PongBall';

describe('<PongBall />', () => {
  test('it should mount', () => {
    render(<PongBall />);
    
    const pongBall = screen.getByTestId('PongBall');

    expect(pongBall).toBeInTheDocument();
  });
});