
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import toast from 'react-hot-toast';

// Mock AuthContext
const mockAuthContext = {
  user: null,
  login: vi.fn(),
  logout: vi.fn(),
};

vi.mock('../context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
}));

// Mock react-router-dom's useNavigate
const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockedUseNavigate,
  };
});

// Mock toast for notifications
vi.mock('react-hot-toast', () => {
  const mockToast = {
    success: vi.fn(),
    error: vi.fn(),
  };
  return {
    __esModule: true,
    default: mockToast,
    toast: mockToast,
  };
});

// Mock GoogleLoginButton
vi.mock('./GoogleLoginButton', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-google-login-button"></div>,
}));

describe('Login Component', () => {
  beforeEach(() => {
    mockAuthContext.login.mockClear();
    mockedUseNavigate.mockClear();
    (toast.error as any).mockClear?.();
  });

  const renderComponent = () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  };

  it('renders the login form', () => {
    renderComponent();

    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('allows typing in email and password fields', () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('calls login with correct credentials on successful submission', async () => {
    mockAuthContext.login.mockResolvedValueOnce({ token: 'fake-token', email: 'test@example.com' });

    renderComponent();

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockAuthContext.login).toHaveBeenCalledTimes(1);
      expect(mockAuthContext.login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('displays an error message on failed login', async () => {
    mockAuthContext.login.mockRejectedValueOnce(new Error('Invalid credentials'));

    renderComponent();

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockAuthContext.login).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });
});
