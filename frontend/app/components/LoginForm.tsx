'use client';

import { useState } from 'react';
import { useGoogleLogin, CodeResponse } from '@react-oauth/google';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const mutation = useMutation({
    mutationFn: async (code: string) => {
      const response = await axios.post('http://localhost:8000/api/exchange', { code });
      return response.data;
    },
  });

  const login = useGoogleLogin({
    onSuccess: (response: CodeResponse) => {
      console.log('Authorization Response:', response); // Debug the full response
      const code = response.code;
      if (code) {
        mutation.mutate(code);
      } else {
        console.error('No code returned from Google');
        mutation.mutate('No token received' as any);
      }
    },
    onError: () => mutation.mutate('Login failed' as any),
    flow: 'auth-code',
    redirect_uri: 'http://localhost:3000/', // Re-enabled to enforce consistency
  });

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center">Welcome to the Canadian Red Cross Virtual Portal</h2>
      <p className="text-blue-600 text-center underline">Please sign in with Google</p>
      <button
        type="button"
        onClick={() => login()}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Sign in with Google
      </button>
      {mutation.isPending && <p>Logging in...</p>}
      {mutation.error && <p className="text-red-500">Error: {(mutation.error as any).message}</p>}
      {mutation.data && mutation.data.id_token && <p className="text-green-500">Logged in as {email || mutation.data.id_token}</p>}
    </div>
  );
}