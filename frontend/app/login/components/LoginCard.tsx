// frontend/app/components/LoginForm.tsx
'use client';

import { useGoogleLogin } from '@react-oauth/google';
import GoogleSignInButton from './GoogleSignInButton';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

export default function LoginForm() {
  const { signIn, loading, error } = useGoogleAuth();

  const login = useGoogleLogin({
    onSuccess: (response) => signIn(response.code!),
    flow: 'auth-code',
    redirect_uri: 'http://localhost:3000',
    scope: 'https://www.googleapis.com/auth/calendar.readonly openid email profile',
  });

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
          +
        </div>
        <h1 className="text-2xl font-bold">Canadian Red Cross</h1>
        <p className="text-gray-600 mt-2">Virtual Portal</p>
      </div>

      <GoogleSignInButton loading={loading} onClick={() => login()} error={error} />
    </div>
  );
}
