import Link from 'next/link';
import { getPoseById } from '@/lib/db';

type Props = {
  params: { id: string };
};

export default function PoseDetailPage({ params }: Props) {
  const pose = getPoseById(params.id);
  if (!pose) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-24 text-slate-100">
        <p className="text-center text-xl">Pose not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 text-slate-100">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_0.45fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glow">
          <img src={pose.image} alt={pose.title} className="h-[520px] w-full object-cover" />
          <div className="space-y-4 p-8">
            <span className="inline-flex rounded-full bg-pink-500/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-pink-200">{pose.category}</span>
            <h1 className="text-4xl font-semibold text-white">{pose.title}</h1>
            <p className="max-w-3xl text-base leading-8 text-slate-300">{pose.description}</p>
            <div className="flex flex-wrap gap-3">
              {pose.moodTags.map((tag) => (
                <span key={tag} className="tag-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Details</p>
            <div className="space-y-3">
              {pose.tips.map((tip) => (
                <div key={tip} className="rounded-3xl bg-black/30 p-4 text-sm leading-7 text-slate-300">
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-pink-300">Next step</p>
            <p className="text-sm leading-7 text-slate-300">Try this pose in natural light with minimal props and pay attention to soft lines in the shoulders.</p>
            <Link href="/swipe" className="inline-flex rounded-full bg-pink-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-pink-400">
              Explore more
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
