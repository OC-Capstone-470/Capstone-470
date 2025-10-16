'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      // Mock API call (simulates /token endpoint from User Management Service)
      return { token: 'mock_token', role: 'admin' };
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center">Welcome to the Canadian Red Cross Virtual Portal</h2>
      <p className="text-blue-600 text-center underline">Please sign in or create an account</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-left font-medium">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=""
            className="w-full p-2 bg-gray-300 border border-gray-400 rounded"
          />
          <a href="#" className="text-blue-600 text-sm block text-left">Forgot Username</a>
        </div>
        <div>
          <label className="block text-left font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            className="w-full p-2 bg-gray-300 border border-gray-400 rounded"
          />
          <a href="#" className="text-blue-600 text-sm block text-left">Forgot Password</a>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Sign In
        </button>
      </form>
      <div className="flex justify-center">
        <span>I am not a robot</span>
      </div>
      {mutation.isPending && <p className="text-center">Logging in...</p>}
      {mutation.error && <p className="text-red-500 text-center">Error: {(mutation.error as Error).message}</p>}
      {mutation.data && <p className="text-green-500 text-center">Logged in as {mutation.data.role}</p>}
    </div>
  );
}