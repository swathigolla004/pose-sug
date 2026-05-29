'use client';
import { useEffect, useMemo, useState } from 'react';
import SwipeCard from '@/components/SwipeCard';
import SearchFilters from '@/components/SearchFilters';

type Pose = {
  id: string;
  title: string;
  description: string;
  category: string;
  moodTags: string[];
  tips: string[];
  image: string;
};

export default function SwipePage() {
  const [poses, setPoses] = useState<Pose[]>([]);
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Swipe through the newest pose ideas.');

  const current = poses[index];
  const token = typeof window !== 'undefined' ? localStorage.getItem('insposwipe-token') : null;

  useEffect(() => {
    setLoading(true);
    fetch('/api/poses')
      .then((res) => res.json())
      .then((data) => {
        setPoses(data);
        setIndex(0);
        setMessage(data.length ? 'Swipe the feed to discover more.' : 'No pose ideas available yet.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch('/api/favorites', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setSaved(data.map((pose: Pose) => pose.id)))
      .catch(() => setSaved([]));
  }, [token]);

  function changeFilters(query: string, category: string) {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (category !== 'all') params.set('category', category);

    fetch(`/api/poses?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setPoses(data);
        setIndex(0);
        setMessage(data.length ? 'Keep swiping.' : 'No results, try a broader search or clear text.');
      })
      .finally(() => setLoading(false));
  }

  function handleSave() {
    if (!current) return;
    if (!token) {
      setMessage('Login to save poses to your profile.');
      return;
    }
    fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ poseId: current.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.saved) {
          setSaved(data.saved);
          setMessage(data.saved.includes(current.id) ? 'Saved to your profile.' : 'Removed from saved poses.');
        }
      });
  }

  const nextPose = () => setIndex((prev) => (poses.length ? (prev + 1) % poses.length : 0));

  const headCount = useMemo(() => `${index + 1}/${poses.length}`, [index, poses.length]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 text-slate-100">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_0.45fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.28em] text-pink-300">Swipe feed</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Infinite pose discovery with a swipe-first flow.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">Filter the aesthetic categories, explore fresh motion-based compositions, and save the moments you want to recreate.</p>
            <p className="mt-5 text-sm text-slate-400">{message}</p>
          </div>
          <div className="min-h-[78vh]">
            {loading ? (
              <div className="flex min-h-[62vh] items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 text-slate-300">
                Loading poses...
              </div>
            ) : current ? (
              <SwipeCard onNext={nextPose} onSave={handleSave} isSaved={saved.includes(current.id)} pose={current} />
            ) : (
              <div className="flex min-h-[62vh] flex-col items-center justify-center gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center text-slate-300">
                <p>No poses found. Adjust your search or clear the query.</p>
                <button
                  type="button"
                  onClick={() => changeFilters('', 'all')}
                  className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-pink-400"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-5 text-sm text-slate-300">
            <p className="font-semibold text-white">Swipe tip</p>
            <p className="mt-2 leading-7">Save your favorite inspiration first, then use the detail cards to practice mood, framing, and the light direction for your next shoot.</p>
            <p className="mt-4 text-xs uppercase tracking-[0.24em] text-pink-300">{headCount}</p>
          </div>
        </div>
        <SearchFilters onChange={changeFilters} />
      </div>
    </div>
  );
}
