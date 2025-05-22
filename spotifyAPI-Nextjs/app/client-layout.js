'use client';

/**
 * Client-side layout component that wraps the application with NextAuth's SessionProvider.
 * This enables authentication state management and session handling across the app.
 */

import { SessionProvider } from 'next-auth/react';

/**
 * ClientLayout component that provides authentication context to child components.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped with SessionProvider
 */
export default function ClientLayout({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}