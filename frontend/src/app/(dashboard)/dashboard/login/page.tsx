'use client';

import { signIn } from 'next-auth/react';

function SignInButton() {
  return (
    <button
      onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Sign in with GitHub
    </button>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-4">Dashboard Login</h1>
      <SignInButton />
    </div>
  );
}