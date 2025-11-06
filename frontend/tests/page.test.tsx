import { render, screen } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from '../app/page';
import '@testing-library/jest-dom';


test('renders login form', () => {
  render(
    <GoogleOAuthProvider clientId="test">
      <Home />
    </GoogleOAuthProvider>
  );
  expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
});