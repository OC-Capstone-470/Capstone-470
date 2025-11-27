// frontend/app/login/page.tsx
'use client';

import LoginCard from './components/LoginCard';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="p-2 bg-red-600 text-white text-center">
        <h1 className="text-xl font-bold">Canadian Red Cross Virtual Portal</h1>
      </header>
      <main className="flex-1 flex justify-center items-center p-4">
        <LoginCard />
      </main>
      <footer className="p-2 bg-red-600 text-white text-center text-sm">
        Copyright © 2025 Canadian Red Cross
      </footer>
    </div>
  );
}