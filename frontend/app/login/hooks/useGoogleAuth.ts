// frontend/app/hooks/useGoogleAuth.ts
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const signIn = async (code: string) => {
    setLoading(true);
    setError('');

    try {
      const AUTH_URL = 'http://localhost:8001';
      const { data } = await axios.post(`${AUTH_URL}/exchange`, { code });

      localStorage.setItem('google_id_token', data.id_token);
      localStorage.setItem('google_access_token', data.access_token);

      // Optional: validate call
      await axios.get(`${AUTH_URL}/validate`, {
        headers: { Authorization: `Bearer ${data.id_token}` },
      });

      router.push('/calendar');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
}
