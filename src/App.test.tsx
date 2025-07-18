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
    // You'll need to adjust this assertion based on what your App component renders
    // For example, if it renders a Header component, you might look for text in the header.
    expect(screen.getByRole('heading', { name: /AutoPartHub/i })).toBeInTheDocument();
  });
});