// frontend/app/page.tsx
'use client';

import LoginForm from './components/LoginForm';

export default function Home() {
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