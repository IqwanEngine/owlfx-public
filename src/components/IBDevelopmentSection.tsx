import React, { useState } from 'react';
import { IBRegionData, Region } from '../types';
import { IB_REGIONS_DATA } from '../data/initialData';
import { Briefcase, ArrowUpRight, CheckCircle, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ShimmerImage } from './ShimmerImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface IBDevelopmentSectionProps {
  currentRegion?: Region;
  ibData?: Record<'MY' | 'ID', IBRegionData>;
  onOpenLightbox: (images: { url: string; caption?: string; title?: string }[], index: number) => void;
}

export const IBDevelopmentSection: React.FC<IBDevelopmentSectionProps> = ({
  currentRegion = 'MY',
  ibData,
  onOpenLightbox,
}) => {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<Region>(currentRegion || 'MY');
  const containerRef = useScrollReveal();

  // Bullet-proof data fallback ensuring Indonesia is never null/undefined
  const regionData: IBRegionData = 
    (ibData && ibData[selectedRegion]) ||
    IB_REGIONS_DATA[selectedRegion] ||
    IB_REGIONS_DATA.MY;

  // Normalize activities and album images for zero-crash rendering
  const activitiesList = regionData?.activities || [];

  const handleActivityClick = (index: number) => {
    if (!activitiesList || activitiesList.length === 0) return;
    const formatted = activitiesList.map((act) => ({
      url: act.imageUrl || act.url || '',
      caption: `[IB ${regionData.region || selectedRegion}] ${act.title || act.caption || 'Aktiviti IB'} — ${act.location || 'OWLFX Event'} (${act.date || '2026'})`,
      title: act.title || act.caption || 'Aktiviti Rasmi IB',
    }));
    onOpenLightbox(formatted, index);
  };

  const activeIBStat = regionData?.stats?.activeIB || (selectedRegion === 'MY' ? '420+ Master & Sub-IB' : '280+ Mitra IB Nusantara');
  const totalVolumeStat = regionData?.stats?.totalVolume || (selectedRegion === 'MY' ? '$18.4M+ Lot Sebulan' : '$12.8M+ Volume Bulanan');
  const monthlyRebateStat = regionData?.stats?.monthlyRebate || (selectedRegion === 'MY' ? 'RM 1,250,000+' : 'Rp 3.8 Miliar+');
  const tierCommissionStat = regionData?.stats?.tierCommission || (selectedRegion === 'MY' ? 'Hingga $15 / Lot' : 'Hingga $16 / Lot');
  const registrationLink = regionData?.registerLink || regionData?.registrationUrl || (selectedRegion === 'MY' ? 'https://owlfx.my/my/ib_development' : 'https://owlfx.my/id/ib_development');

  return (
    <section id="ib-development" ref={containerRef} className="py-24 relative bg-[#06090E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.ib.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {t.ib.title1} <span className="text-gold-gradient">{t.ib.title2}</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.ib.description}
          </p>
        </div>

        {/* Dual Region Tab System */}
        <div className="flex justify-center mb-10 reveal-on-scroll reveal-delay-1">
          <div
            id="ib-region-tab-container"
            className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl backdrop-blur-xl"
          >
            <button
              id="ib-tab-malaysia"
              type="button"
              onClick={() => setSelectedRegion('MY')}
              className={`btn-luxury-shimmer px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center space-x-2.5 cursor-pointer ${
                selectedRegion === 'MY'
                  ? 'bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] border border-[#3B82F6]/70 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">🇲🇾</span>
              <span>{t.ib.tabMY}</span>
            </button>

            <button
              id="ib-tab-indonesia"
              type="button"
              onClick={() => setSelectedRegion('ID')}
              className={`btn-luxury-shimmer px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center space-x-2.5 cursor-pointer ${
                selectedRegion === 'ID'
                  ? 'bg-gradient-to-r from-[#991B1B] to-[#DC2626] text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] border border-[#EF4444]/70 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">🇮🇩</span>
              <span>{t.ib.tabID}</span>
            </button>
          </div>
        </div>

        {/* Region Content Container - reveal-on-scroll REMOVED to eliminate black screen on tab toggle */}
        <div
          id={`ib-region-content-${selectedRegion}`}
          className="rounded-3xl glass-card border border-white/10 p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 relative overflow-hidden"
        >
          {/* Subtle regional light spot */}
          <div
            className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-colors duration-500 ${
              selectedRegion === 'MY' ? 'bg-[#2563EB]/10' : 'bg-[#DC2626]/10'
            }`}
          />

          {/* Regional Header & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-white/10 mb-8 relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  selectedRegion === 'MY'
                    ? 'bg-blue-950 text-sky-400 border border-blue-500/40'
                    : 'bg-rose-950 text-red-400 border border-red-500/40'
                }`}
              >
                {regionData.badge || (selectedRegion === 'MY' ? '🇲🇾 Rasmi Malaysia Ecosystem' : '🇮🇩 Resmi Indonesia Ecosystem')}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {regionData.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {regionData.description}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 pt-2">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t.ib.partnerSupport1}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t.ib.partnerSupport2}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t.ib.partnerSupport3}</span>
                </div>
              </div>
            </div>

            {/* Stats Metrics Quad */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  {selectedRegion === 'MY' ? 'IB & MITRA AKTIF' : 'MITRA AKTIF'}
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  {activeIBStat}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">VOLUM BULANAN</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-[#D4AF37]">
                  {totalVolumeStat}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">REBAT DISEDIAKAN</span>
                <span className="text-lg sm:text-xl font-black font-mono text-emerald-400">
                  {monthlyRebateStat}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">TIER KOMISEN</span>
                <span className="text-lg sm:text-xl font-black font-mono text-sky-400">
                  {tierCommissionStat}
                </span>
              </div>
            </div>
          </div>

          {/* Regional Activity Album & Official Coverage */}
          <div className="mb-10 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-white">
                  Liputan Rasmi & Aktiviti IB {selectedRegion === 'MY' ? 'Malaysia' : 'Indonesia'}
                </h4>
                <p className="text-xs text-slate-400">
                  Bengkel kepimpinan, malam pengiktirafan, dan kit barangan rasmi (Official Merchandise).
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                Klik gambar untuk zum (Lightbox)
              </span>
            </div>

            {activitiesList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activitiesList.map((act, idx) => (
                  <div
                    key={`ib-${selectedRegion}-${act.id || idx}`}
                    id={`ib-act-card-${act.id || idx}`}
                    onClick={() => handleActivityClick(idx)}
                    className="group rounded-2xl overflow-hidden bg-slate-900/90 border border-white/10 hover:border-[#D4AF37]/60 transition-all cursor-pointer shadow-lg flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <ShimmerImage
                        src={act.imageUrl || act.url || ''}
                        alt={act.title || act.caption || 'Aktiviti IB'}
                        fallbackSrc="https://drive.google.com/file/d/1tm2SG-Y3tJya5AjgYDkOipVLD3VyxZRX/view?usp=drive_link"
                        containerClassName="relative w-full h-full"
                        imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        badgeLabel={`IB ${selectedRegion === 'MY' ? 'MALAYSIA' : 'INDONESIA'}`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 text-[#D4AF37] border border-[#D4AF37]/30 z-20">
                        {act.category || 'Program'}
                      </span>

                      <span className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-300 z-20">
                        {act.date || '2026'} • {act.location || 'Wilayah'}
                      </span>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 z-20">
                        <div className="p-2 rounded-full bg-[#D4AF37] text-slate-950 shadow-md">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h5 className="font-bold text-sm text-white mb-1.5 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                        {act.title || act.caption}
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {act.description || act.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Dark Luxury Fallback Placeholder if activities are empty */
              <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-8 text-center flex flex-col items-center justify-center space-y-3">
                <Briefcase className="w-10 h-10 text-[#D4AF37]/70" />
                <h5 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Aktiviti Wilayah {selectedRegion === 'MY' ? 'Malaysia' : 'Indonesia'} Akan Dikemaskini
                </h5>
                <p className="text-xs text-slate-400 max-w-md">
                  Dokumentasi acara dan galeri foto sedang disunting oleh pihak pengurusan OWLFX. Pendaftaran mitra IB kekal dibuka seperti biasa.
                </p>
              </div>
            )}
          </div>

          {/* DEDICATED ACTION BUTTONS AT BOTTOM OF ALBUM */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="text-center sm:text-left">
              <span className="text-xs font-mono text-slate-400 block">
                PAUTAN RASMI: <span className="text-white font-mono">{registrationLink}</span>
              </span>
              <p className="text-xs text-slate-300">
                Penyertaan pantas disokong oleh perkhidmatan pelanggan 24/7.
              </p>
            </div>

            {selectedRegion === 'MY' ? (
              /* Malaysia Action Link: Royal Blue / Gold */
              <a
                id="ib-action-btn-malaysia"
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-luxury-shimmer btn-gold-luxury w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm tracking-wide text-white bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#D4AF37] border border-[#3B82F6]/60 flex items-center justify-center space-x-3 cursor-pointer"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">🇲🇾</span>
                <span>{regionData.buttonText || t.ib.btnRegisterMY}</span>
                <ArrowUpRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
              </a>
            ) : (
              /* Indonesia Action Link: Crimson Red / Gold */
              <a
                id="ib-action-btn-indonesia"
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-luxury-shimmer btn-rose-luxury w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm tracking-wide text-white bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#D4AF37] border border-[#EF4444]/60 flex items-center justify-center space-x-3 cursor-pointer"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">🇮🇩</span>
                <span>{regionData.buttonText || t.ib.btnRegisterID}</span>
                <ArrowUpRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
