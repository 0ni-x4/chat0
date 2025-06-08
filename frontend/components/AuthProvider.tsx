'use client';

import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // Better-auth doesn't require a provider wrapper like other auth libraries
  // The hooks work directly with the client
  return <>{children}</>;
} 