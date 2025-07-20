import React from 'react';
import * as Sentry from '@sentry/react';

const SentryTest: React.FC = () => {
  const testSentryError = () => {
    try {
      throw new Error('Test Sentry Error from React Frontend - ' + new Date().toISOString());
    } catch (error) {
      Sentry.captureException(error);
      console.log('Sentry error captured:', error);
    }
  };

  const testSentryMessage = () => {
    Sentry.captureMessage('Test message from React Frontend - ' + new Date().toISOString(), 'info');
    console.log('Sentry message captured');
  };

  const testSentryUser = () => {
    Sentry.setUser({
      id: 'test-user-123',
      email: 'test@example.com',
      username: 'testuser',
    });
    Sentry.captureMessage('User context set - ' + new Date().toISOString(), 'info');
    console.log('Sentry user context set');
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg max-w-md mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4">Sentry Integration Test</h3>
      <div className="space-y-2">
        <button
          onClick={testSentryError}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
        >
          Test Sentry Error
        </button>
        <button
          onClick={testSentryMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
        >
          Test Sentry Message
        </button>
        <button
          onClick={testSentryUser}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
        >
          Test Sentry User Context
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        Click these buttons to test Sentry integration. Check your browser console and Sentry dashboard for events.
      </p>
      <div className="mt-4 p-2 bg-yellow-100 rounded text-sm">
        <strong>Status:</strong> Sentry React integration is active
      </div>
    </div>
  );
};

export default SentryTest; 