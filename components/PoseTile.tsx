'use client';
import Link from 'next/link';

type Props = {
  pose: {
    id: string;
    title: string;
    category: string;
    moodTags: string[];
    image: string;
  };
};

export default function PoseTile({ pose }: Props) {
  return (
    <Link href={`/pose/${pose.id}`} className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
      <div className="relative h-64 overflow-hidden">
        <img src={pose.image} alt={pose.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-300">
          <span>{pose.category}</span>
          <span>{pose.moodTags[0]}</span>
        </div>
        <h3 className="text-lg font-semibold text-white">{pose.title}</h3>
      </div>
    </Link>
  );
}
