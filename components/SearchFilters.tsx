'use client';
import { useState } from 'react';

const categories = ['all', 'cute', 'aesthetic', 'travel', 'mirror', 'cafe', 'street'];

type Props = {
  onChange: (query: string, category: string) => void;
};

export default function SearchFilters({ onChange }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  return (
    <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 text-slate-300 shadow-glow">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onChange(query, category);
        }}
        placeholder="Search poses, moods, ideas..."
        className="w-full rounded-3xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20"
      />
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setCategory(item);
              onChange(query, item);
            }}
            className={`rounded-full px-4 py-2 text-sm transition ${category === item ? 'bg-pink-500 text-slate-950' : 'bg-white/5 text-slate-200 hover:bg-white/10'}`}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange(query, category)}
        className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-pink-500/20 transition hover:opacity-95"
      >
        Apply filters
      </button>
    </div>
  );
}
