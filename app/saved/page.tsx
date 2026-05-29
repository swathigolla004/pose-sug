'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PoseTile from '@/components/PoseTile';

export default function SavedPage() {
  const [poses, setPoses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Your saved pose collection will appear here.');

  useEffect(() => {
    const token = localStorage.getItem('insposwipe-token');
    if (!token) {
      setMessage('Login to see your saved inspirations.');
      setLoading(false);
      return;
    }
    fetch('/api/favorites', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setPoses(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 text-slate-100">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow">
        <p className="text-sm uppercase tracking-[0.28em] text-pink-300">Saved poses</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Your saved inspiration board.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Everything you keep for later lives in a polished, swipe-ready collection.</p>
      </div>
      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-slate-300">Loading your collection…</div>
      ) : poses.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {poses.map((pose) => (
            <PoseTile key={pose.id} pose={pose} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-slate-300">
          <p>{message}</p>
          <div className="mt-6 flex justify-center">
            <Link href="/swipe" className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-pink-400">
              Browse poses
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
