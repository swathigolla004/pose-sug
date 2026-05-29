'use client';
import { motion } from 'framer-motion';
import { Heart, Info, Sparkles } from 'lucide-react';

type Props = {
  pose: {
    id: string;
    title: string;
    description: string;
    category: string;
    moodTags: string[];
    tips: string[];
    image: string;
  };
  onSave: () => void;
  onNext: () => void;
  isSaved: boolean;
};

export default function SwipeCard({ pose, onSave, onNext, isSaved }: Props) {
  return (
    <motion.article
      key={pose.id}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative mx-auto flex min-h-[78vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.16),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.85),rgba(15,23,42,0.95))] shadow-glow"
    >
      <div className="relative h-[58vh] overflow-hidden">
        <img src={pose.image} alt={pose.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6" />
      </div>
      <div className="space-y-5 px-6 pb-6 pt-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">
            {pose.category}
          </span>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs">
              <Sparkles size={14} /> {pose.moodTags.join(' · ')}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-3xl font-semibold leading-tight text-white">{pose.title}</h2>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
              pose
            </span>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">{pose.description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {pose.tips.map((tip) => (
            <div key={tip} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <Info size={14} /> Tip
              </div>
              <p>{tip}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <Heart className={isSaved ? 'text-pink-400' : ''} size={18} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-pink-400"
          >
            Next Pose
          </button>
        </div>
      </div>
    </motion.article>
  );
}
