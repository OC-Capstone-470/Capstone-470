'use client';

import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setLoading(true);
      setError('');
      try {
        const AUTH_URL = "http://localhost:8001"

        // Exchange code
        const { data } = await axios.post(`${AUTH_URL}/exchange`, {  // Use AUTH_URL
          code: response.code,
        });

        const id_token = data.id_token;

        localStorage.setItem('google_id_token', id_token);

        localStorage.setItem('google_access_token', data.access_token);
        console.log('ACCESS TOKEN SAVED:', data.access_token);

        // Validate
        const { data: validateData } = await axios.get(`${AUTH_URL}/validate`, {  // Use AUTH_URL
          headers: { Authorization: `Bearer ${id_token}` },
        });

        setEmail(validateData.email);

        const { data: userData } = await axios.get('http://localhost:8002/users/me', {
          headers: { Authorization: `Bearer ${id_token}` },
        });
        console.log('User Profile:', userData);
        router.push('/calendar');
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Login failed');
      } finally {
        setLoading(false);
      }
    },
    flow: 'auth-code',
    redirect_uri: 'http://localhost:3000',
    scope: 'https://www.googleapis.com/auth/calendar.readonly openid email profile'
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            +
          </div>
          <span className="text-xl font-bold">Canadian Red Cross</span>
        </div>
        <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
          French/English
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6">
        Welcome to the Canadian Red Cross Virtual Portal
      </h1>

      {/* Subtitle */}
      <p className="text-center text-blue-600 underline mb-8">
        Please sign in or <a href="#" className="text-blue-600">create an account</a>
      </p>

      {/* Google Button */}
      <button
        onClick={() => login()}
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>

      {/* Error / Success */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {email && (
        <p className="text-green-600 text-center mt-4 font-semibold">
          Logged in as {email}
        </p>
      )}
    </div>
  );
}