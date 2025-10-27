'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import MockAdapter from 'axios-mock-adapter';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="p-2 bg-red-600 text-white text-center">
        <h1 className="text-xl font-bold">Canadian Red Cross Virtual Portal</h1>
      </header>
      <main className="flex-1 flex justify-center items-center p-4">
        <LoginForm />
      </main>
      <footer className="p-2 bg-red-600 text-white text-center text-sm">
        Copyright 2025 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </footer>
    </div>
  );
}

/*export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8080/users');
      return response.data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="p-2 bg-red-600 text-white text-center">
        <h1 className="text-xl font-bold">Canadian Red Cross Virtual Portal</h1>
      </header>
      <main className="flex-1 flex justify-center items-center p-4">
        <LoginForm />
      </main>
      <footer className="p-2 bg-red-600 text-white text-center text-sm">
        Copyright 2025 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </footer>
      {isLoading && <p className="text-center">Loading users...</p>}
      {error && <p className="text-red-500 text-center">Error: {error.message}</p>}
      {data && (
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold">Users</h2>
          <ul className="space-y-2">
            {data.map((user: any) => (
              <li key={user.id} className="p-2 border rounded">
                {user.username} ({user.role})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}*/