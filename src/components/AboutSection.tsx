import React, { useState } from 'react';
import { Shield, Database, Users, CheckCircle2, ArrowRight, Activity, Layers } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const containerRef = useScrollReveal();

  const pillars = [
    {
      id: 0,
      title: "Integriti & Eksekusi Tulen",
      subtitle: "Tier-1 Liquidity Access Tanpa Konflik Kepentingan",
      icon: Shield,
      accentColor: "from-[#D4AF37] to-[#F59E0B]",
      tag: "TIADA DEALING DESK",
      description:
        "OWLFX dibina atas prinsip ketelusan mutlak. Kami beroperasi secara langsung melalui penyedia kecairan institusi antarabangsa menerusi akaun MIB Valetax. Tiada 'b-book manipulation', tiada lonjakan spread buatan, dan setiap pesanan dihantar terus ke pasaran antara bank (Interbank ECN).",
      points: [
        "Akaun ECN Raw Spread bermula 0.0 pip pada pasangan mata wang utama dan Gold.",
        "Pelaksanaan pantas dengan latensi pelayan kurang daripada 15 milisaat (Equinix NY4/LD4).",
        "Pemisahan dana pedagang (Segregated Client Funds) di bank berkanun gred AA."
      ]
    },
    {
      id: 1,
      title: "Indicator & Kod Algoritma",
      subtitle: "Code Struktur Pasaran Berasaskan Kepintaran Buatan",
      icon: Database,
      accentColor: "from-[#38BDF8] to-[#2563EB]",
      tag: "ORDER FLOW & ALGO",
      description:
        "Zaman dagangan berasaskan emosi dan firasat rawak telah berakhir. OWLFX menggabungkan pemprosesan data bervolum besar, model kebarangkalian Bayes, dan pengesanan zon Institutional Order Flow untuk membina indikator petunjuk yang memberi kelebihan statistik (statistical edge) kepada pedagang runcit.",
      points: [
        "Pengesanan zon Liquidity Sweep dan Fair Value Gap (FVG) secara automatik.",
        "Penapis volum pasaran masa nyata untuk menolak isyarat palsu semasa pasaran mendatar.",
        "Pengurusan nisbah risiko ganjaran minimum 1:3 untuk mengekalkan jangkaan positif."
      ]
    },
    {
      id: 2,
      title: "Ketelusan Komuniti & Self-Rebate",
      subtitle: "Ekosistem Win-Win untuk Pedagang dan IB",
      icon: Users,
      accentColor: "from-[#10B981] to-[#059669]",
      tag: "EKOSISTEM TELUS",
      description:
        "Bagi kami, kejayaan jangka panjang pedagang adalah teras perniagaan. Kami menstruktur semula sistem Introducing Broker konvensional dengan memulangkan sebahagian besar rebat komisen terus ke poket pedagang itu sendiri (Self-Rebate), disokong oleh jelajah kelas fizikal berkala di 14 negeri.",
      points: [
        "Pemulangan tunai rebat harian/mingguan yang boleh ditarik keluar serta-merta.",
        "Bimbingan fizikal bersemuka tanpa yuran tersembunyi melalui Roadtour Kebangsaan.",
        "Sokongan meja dagangan (Desk Support) pantas melalui WhatsApp dan Telegram komuniti."
      ]
    }
  ];

  return (
    <section id="about" ref={containerRef} className="py-24 relative bg-[#06090E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 reveal-on-scroll">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL PEDIGREE & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Merapatkan Jurang Antara{' '}
            <span className="text-gold-gradient">Pedagang Runcit</span> & Pasaran Institusi
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            OWLFX diasaskan dengan satu visi yang jelas: memperkasa komuniti pedagang di Asia Tenggara melalui capaian kepada alatan dagangan termaju, analitik kuantitatif pintar, serta sokongan modal bertaraf Wall Street — semuanya didokong oleh ekosistem MIB yang terbukti kukuh.
          </p>
        </div>

        {/* 3 Interactive Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activePillar === pillar.id;

            return (
              <div
                key={pillar.id}
                id={`about-pillar-card-${pillar.id}`}
                onClick={() => setActivePillar(pillar.id)}
                className={`group relative rounded-2xl p-7 transition-all duration-300 cursor-pointer glass-card border reveal-on-scroll reveal-delay-${pillar.id + 1} ${
                  isSelected
                    ? 'border-[#D4AF37] bg-[#0C1326] shadow-2xl gold-glow'
                    : 'border-white/10 hover:border-white/20 hover:bg-slate-900/60'
                }`}
              >
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${pillar.accentColor} text-slate-950 font-bold shadow-lg`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-slate-300 tracking-wider">
                    {pillar.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {pillar.title}
                </h3>
                <h4 className="text-xs font-mono text-slate-400 mb-4">{pillar.subtitle}</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">{pillar.description}</p>

                {/* Key Bullet Points */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  {pillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Visual indicator bar at bottom */}
                <div
                  className={`mt-6 h-1 w-full rounded-full transition-all duration-500 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B]'
                      : 'bg-white/5 group-hover:bg-white/15'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Corporate Commitment Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#0A0F1D] via-[#101935] to-[#0A0F1D] p-6 sm:p-8 border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6 reveal-on-scroll reveal-delay-2">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Komitmen Standard Institusi Global</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Setiap peserta komuniti OWLFX dilindungi di bawah garis panduan pengurusan risiko profesional.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="block text-[11px] font-mono text-slate-400">SISTEM AUDIT</span>
              <span className="text-xs font-mono font-bold text-emerald-400">PASUKAN RISK COMPLIANCE AKTIF</span>
            </div>
            <a
              href="#vip-signal"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white border border-white/10 transition-all flex items-center space-x-2"
            >
              <span>Lihat Rekod Prestasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
