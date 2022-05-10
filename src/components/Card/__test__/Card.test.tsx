import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../index';

describe('Card component', () => {
  test('should render description', () => {
    render(<Card name="Testing description" imgSource="test.jpg" />);
    const paragraphElement = screen.getByText('Testing description');
    expect(paragraphElement).toBeInTheDocument();
  });

  test('Should render image', () => {
    render(<Card name="Testing description" imgSource="test.jpg" />);
    const imgElement: HTMLImageElement = screen.getByRole('img');
    expect(imgElement.src).toContain('.jpg' || '.png');
  });
});
