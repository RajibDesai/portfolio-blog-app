'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { Session } from 'next-auth';

export default function AuthActions({ session }: { session: Session | null }) {
  return session?.user ? (
    // যদি ব্যবহারকারী লগইন করা থাকে
    <Button onClick={() => signOut()} variant="default">
      Sign Out
    </Button>
  ) : (
    // যদি ব্যবহারকারী লগইন করা না থাকে
    <Button onClick={() => signIn('github', { callbackUrl: '/dashboard' })} variant="secondary">
      Sign in
    </Button>
  );
}