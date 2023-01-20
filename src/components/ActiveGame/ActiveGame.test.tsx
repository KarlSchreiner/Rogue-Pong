import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ActiveGame from './ActiveGame';

describe('<ActiveGame />', () => {
  test('it should mount', () => {
    render(<ActiveGame />);
    
    const activeGame = screen.getByTestId('ActiveGame');

    expect(activeGame).toBeInTheDocument();
  });
});