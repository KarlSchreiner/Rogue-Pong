import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Ball from './Ball';

describe('<Ball />', () => {
  test('it should mount', () => {
    // render(<Ball id={0} callUpdate={0}/>);
    
    const ball = screen.getByTestId('Ball');

    expect(ball).toBeInTheDocument();
  });
});