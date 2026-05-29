'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || 'Login failed');
      return;
    }
    localStorage.setItem('insposwipe-token', data.token);
    localStorage.setItem('insposwipe-user', JSON.stringify(data.user));
    router.push('/swipe');
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-16 text-slate-100">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow">
        <p className="text-sm uppercase tracking-[0.28em] text-pink-300">Login</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Welcome back to InspoSwipe.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">Access your saved poses, profile, and curated swipe feed.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-3 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-3 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20"
            />
          </label>
          {error ? <p className="text-sm text-pink-300">{error}</p> : null}
          <button type="submit" className="w-full rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-pink-400">
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          New here? <a href="/auth/signup" className="text-pink-300 hover:underline">Create an account</a>
        </p>
      </div>
    </div>
  );
}
