import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

describe('App', () => {
  it('should render the main application component', () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    // Check for the main element and loading states
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getAllByText('Loading...')).toHaveLength(3); // Header, Main, Footer
  });
});