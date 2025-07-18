import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';

// Mock react-router-dom's useNavigate
const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Login Component', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    mockLogin.mockClear();
    mockedUseNavigate.mockClear();
  });

  it('renders the login form', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ user: null, login: mockLogin, logout: vi.fn() }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('allows typing in email and password fields', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ user: null, login: mockLogin, logout: vi.fn() }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('calls login with correct credentials on successful submission', async () => {
    mockLogin.mockResolvedValueOnce({ token: 'fake-token', email: 'test@example.com' });

    render(
      <Router>
        <AuthContext.Provider value={{ user: null, login: mockLogin, logout: vi.fn() }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('displays an error message on failed login', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <Router>
        <AuthContext.Provider value={{ user: null, login: mockLogin, logout: vi.fn() }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});
