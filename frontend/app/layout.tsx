import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '../providers';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
        <GoogleOAuthProvider clientId="331934203095-4ldjs8or32tjomdo7k49jcsp6ud3sa49.apps.googleusercontent.com">
          <QueryProvider>{children}</QueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}