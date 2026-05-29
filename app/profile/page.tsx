'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [profile, setProfile] = useState<{ name: string; email: string; saved: string[] } | null>(null);
  const [status, setStatus] = useState('Loading profile...');

  useEffect(() => {
    const token = localStorage.getItem('insposwipe-token');
    if (!token) {
      setStatus('Login or signup to access your profile.');
      return;
    }
    fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch(() => setStatus('Unable to fetch profile. Please login again.'));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 text-slate-100">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_0.45fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.28em] text-pink-300">Profile</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Your creative hub.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300">Review your saved poses, update your account, and keep your inspiration organized.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8 text-slate-300 shadow-glow">
          {profile ? (
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-pink-300">Signed in as</p>
                <p className="mt-3 text-2xl font-semibold text-white">{profile.name}</p>
                <p className="mt-1 text-sm text-slate-400">{profile.email}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Saved poses</p>
                <p className="mt-3 text-3xl font-semibold text-white">{profile.saved.length}</p>
              </div>
              <Link href="/saved" className="inline-flex rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-pink-400">
                Open saved board
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="text-sm text-slate-400">{status}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/auth/login" className="rounded-full bg-white/5 px-5 py-3 text-sm text-slate-100 transition hover:bg-white/10">
                  Login
                </Link>
                <Link href="/auth/signup" className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-pink-400">
                  Signup
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
