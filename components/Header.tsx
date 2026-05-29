'use client';
import Link from 'next/link';
import { ArrowRight, Heart, Home, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 text-sm text-slate-300">
        <Link href="/" className="font-semibold tracking-wide text-white">
          InspoSwipe
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/swipe" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10">
            <Home size={16} /> Feed
          </Link>
          <Link href="/saved" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10">
            <Heart size={16} /> Saved
          </Link>
          <Link href="/profile" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10">
            <User size={16} /> Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}
