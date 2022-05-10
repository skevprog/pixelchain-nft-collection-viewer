import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../index';

describe('Loader component', () => {
  test('should render Loader', () => {
    render(<Loader />);
    const loaderElement = screen.getByText('Loading...');
    expect(loaderElement).toBeInTheDocument();
  });
});
