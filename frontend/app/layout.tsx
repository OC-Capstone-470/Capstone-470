import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '../providers';

export const metadata: Metadata = {
  title: 'Volunteer Management App',
  description: 'A mobile-first app for volunteer management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}