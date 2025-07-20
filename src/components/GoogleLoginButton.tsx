import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const GoogleLoginButton: React.FC = () => {
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse: { credential?: string }) => {
    try {
      const response = await api.post('/auth/google/callback', {
        token: credentialResponse.credential,
      });
      login(response.data.user, response.data.token);
      toast.success('Logged in successfully with Google!');
    } catch (error) {
      console.error('Google login failed:', error);
      toast.error('Google login failed. Please try again.');
    }
  };

  const handleError = () => {
    console.log('Google Login Failed');
    toast.error('Google login failed. Please try again.');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
    />
  );
};

export default GoogleLoginButton;
