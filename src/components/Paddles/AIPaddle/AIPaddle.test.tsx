import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import AIPaddle from './AIPaddle';

describe('<AIPaddle />', () => {
  test('it should mount', () => {
    // render(<AIPaddle />);
    
    const AIPaddle = screen.getByTestId('AIPaddle');

    expect(AIPaddle).toBeInTheDocument();
  });
});