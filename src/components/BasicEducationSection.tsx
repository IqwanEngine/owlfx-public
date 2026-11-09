import React from 'react';
import { BookOpen, CalendarDays, GraduationCap, MessagesSquare, PlayCircle, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BasicEducationSection: React.FC = () => {
  const { t } = useLanguage();
  const hubs = [
    { icon: <BookOpen />, title: 'Ada Class', label: 'Class Information', description: 'Struktur kelas asas hingga lanjutan untuk membina kefahaman pasaran yang tersusun.', href: '/masterclass_registration', accent: 'emerald' },
    { icon: <Video />, title: 'Ada Video', label: 'Video Modules', description: 'Video mengajar, latihan praktikal Owl Algo dan modul yang boleh diikuti mengikut tempo anda.', href: '#video-modules', accent: 'cyan' },
    { icon: <MessagesSquare />, title: 'Ada Group', label: 'Community & Support Group', description: 'Sertai komuniti untuk sokongan, perbincangan setup dan bimbingan berterusan.', href: '/group-support', accent: 'amber' },
  ];
  return (
    <section id="education" className="relative overflow-hidden bg-[#060B14] px-4 py-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mx-auto mb-14 max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs text-emerald-400"><GraduationCap className="h-3.5 w-3.5" />{t.education.badge}</span><h2 className="mt-5 text-3xl font-black text-white sm:text-5xl">{t.education.title1} <span className="text-emerald-400">{t.education.title2}</span></h2><p className="mt-4 text-slate-300">{t.education.description}</p></div>
      <div className="grid gap-5 md:grid-cols-3">{hubs.map((hub) => <a key={hub.title} href={hub.href} className="group rounded-2xl border border-white/10 bg-slate-950/70 p-6 transition hover:-translate-y-1 hover:border-emerald-400/60"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400"><div className="h-6 w-6">{hub.icon}</div></div><span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{hub.label}</span><h3 className="mt-2 text-2xl font-bold text-white">{hub.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">{hub.description}</p></a>)}</div>
      <div id="video-modules" className="mt-10 grid gap-5 md:grid-cols-3"><Feature icon={<PlayCircle />} title="Video Mengajar" text="Langkah demi langkah untuk setup TradingView, CHOCH, BOS dan zon sokongan/rintangan." /><Feature icon={<CalendarDays />} title="Owl Algo Practical Training" text="Latihan praktikal membaca confirmation indicator dan mengurus execution dengan disiplin." /><Feature icon={<MessagesSquare />} title="Google Meet Live Coaching Sessions" text="Sesi coaching langsung untuk soalan, semakan setup dan bimbingan komuniti." /></div>
      <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6 text-center sm:flex-row sm:text-left"><picture className="shrink-0"><source srcSet="/OWLFXpng.webp" type="image/webp" /><img src="/OWLFXpng.png" width="72" height="72" loading="lazy" decoding="async" alt="OWLFX Official Logo" className="h-[72px] w-[72px] object-contain" /></picture><div><h3 className="text-xl font-bold text-white">Belajar dengan rangka kerja OWLFX</h3><p className="mt-1 text-sm text-slate-400">Gabungkan kelas, video dan komuniti untuk perjalanan pendidikan trading yang lebih jelas.</p></div></div>
    </div></section>
  );
};

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <article className="rounded-2xl border border-white/10 bg-[#0A101D]/80 p-6"><div className="flex items-center gap-3 text-emerald-400"><span className="rounded-lg bg-emerald-400/10 p-2">{icon}</span><h3 className="font-bold text-white">{title}</h3></div><p className="mt-4 text-sm leading-relaxed text-slate-400">{text}</p></article>; }
