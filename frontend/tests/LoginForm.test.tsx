import { render, screen } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginForm from '../app/components/LoginForm';

test('renders login form', () => {
  render(
    <GoogleOAuthProvider clientId="test-client-id">
      <LoginForm />
    </GoogleOAuthProvider>
  );
  expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
});