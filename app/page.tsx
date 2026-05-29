import Link from 'next/link';

const categories = ['cute', 'aesthetic', 'travel', 'mirror', 'cafe', 'street'];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 text-slate-100">
      <section className="grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-pink-500/15 px-4 py-2 text-sm uppercase tracking-[0.28em] text-pink-300">
            discover your next pose
          </span>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
            InspoSwipe is your aesthetic pose discovery feed for every mood.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-300">
            Swipe through full-screen pose cards, save favorites, and build a vibe board of dreamy photo ideas.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/swipe" className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95">
              Start swiping
            </Link>
            <Link href="/profile" className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-100 transition hover:bg-white/10">
              View profile
            </Link>
          </div>
        </div>
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <div className="rounded-[1.8rem] bg-gradient-to-br from-pink-500/20 to-violet-500/10 p-6 text-slate-100">
            <p className="text-sm uppercase tracking-[0.28em] text-pink-200">Featured journey</p>
            <h2 className="mt-4 text-2xl font-semibold">Mood-driven pose discovery</h2>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              Explore soft cafe movement, street confidence, mirror reflections, travel calm, and cute editorial energy.
            </p>
          </div>
          <div className="grid gap-3">
            {categories.map((category) => (
              <div key={category} className="rounded-3xl bg-black/30 p-4 text-slate-200">
                <p className="text-sm uppercase tracking-[0.24em] text-pink-300">{category}</p>
                <p className="mt-2 text-lg font-semibold text-white">{category === 'cute' ? 'soft smiles' : category === 'mirror' ? 'reflective style' : category === 'travel' ? 'window moods' : category === 'cafe' ? 'coffee shop glow' : category === 'street' ? 'urban motion' : 'light editorial'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="space-y-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-pink-300">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Swipe, save, and save your favorite pose collections.</h2>
          </div>
          <Link href="/swipe" className="rounded-full bg-white/5 px-5 py-3 text-sm text-slate-100 transition hover:bg-white/10">
            Explore the feed
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-100 shadow-glow transition hover:bg-white/10">
            <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Pose ideas</p>
            <h3 className="mt-4 text-xl font-semibold">Curated aesthetic cards</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Every swipe reveals a full-screen motif with styling cues, tag moods, and pro tips.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-100 shadow-glow transition hover:bg-white/10">
            <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Personal library</p>
            <h3 className="mt-4 text-xl font-semibold">Saved collections</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Bookmark the poses that match your mood and revisit them from your profile anytime.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-100 shadow-glow transition hover:bg-white/10">
            <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Mobile-first</p>
            <h3 className="mt-4 text-xl font-semibold">Swipe-ready design</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Designed for a pocket-sized experience with fluid motion and vivid visuals.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
