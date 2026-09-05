import React, { useState } from 'react';
import { INITIAL_SETUP_PROOFS } from '../data/initialData';
import { Target, DollarSign, BarChart2, Image as ImageIcon, ZoomIn, ArrowUpRight, Check, Calculator, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface VipSignalSectionProps {
  onOpenLightbox: (images: { url: string; caption?: string; title?: string }[], index: number) => void;
}

export const VipSignalSection: React.FC<VipSignalSectionProps> = ({
  onOpenLightbox,
}) => {
  const [activeTab, setActiveTab] = useState<'provide' | 'rebate' | 'track' | 'proof'>('provide');
  const containerRef = useScrollReveal({ dependencies: [activeTab] });
  
  // Interactive Self-Rebate Calculator State
  const [tradedLots, setTradedLots] = useState<number>(40);
  const [rebatePerLot, setRebatePerLot] = useState<number>(10); // $10 per lot

  const monthlyRebateUSD = tradedLots * rebatePerLot;
  const monthlyRebateMYR = monthlyRebateUSD * 4.45;
  const monthlyRebateIDR = monthlyRebateUSD * 15600;

  const handleProofClick = (index: number) => {
    const formatted = INITIAL_SETUP_PROOFS.map((item) => ({
      url: item.imageUrl,
      caption: `[${item.pair} ${item.type}] ${item.gainPips} (R:R ${item.rrRatio}) — ${item.chartDescription}`,
      title: `${item.pair} Setup Proof`
    }));
    onOpenLightbox(formatted, index);
  };

  return (
    <section id="vip-signal" ref={containerRef} className="py-24 relative bg-[#070B14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-on-scroll">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#60A5FA] text-xs font-mono mb-4">
              <Target className="w-3.5 h-3.5" />
              <span>VIP SIGNAL, SUPPORT & CASH REBATE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Sistem Isyarat Kuantitatif & <span className="text-gold-gradient">Self-Rebate</span>
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
              Platform menyeluruh yang direka untuk memaksimumkan keuntungan dagangan anda melalui
              setup kebarangkalian tinggi dan pemulangan tunai bagi setiap transaksi.
            </p>
          </div>

          <a
            id="vip-signal-unlock-btn"
            href="/my/register"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <span>Buka Akses Percuma Valetax</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Interactive Tab Selectors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 reveal-on-scroll reveal-delay-1">
          <button
            type="button"
            id="vip-tab-provide"
            onClick={() => setActiveTab('provide')}
            className={`group btn-luxury-shimmer p-4 rounded-2xl text-left transition-all border backdrop-blur-xl cursor-pointer ${
              activeTab === 'provide'
                ? 'bg-white/10 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.35)] scale-[1.02]'
                : 'bg-white/5 border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${activeTab === 'provide' ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.5)]' : 'bg-white/5 text-slate-400 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10'}`}>
                <Target className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">MODUL 01</span>
                <span className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">Apa Kami Provide</span>
              </div>
            </div>
          </button>

          <button
            type="button"
            id="vip-tab-rebate"
            onClick={() => setActiveTab('rebate')}
            className={`group btn-luxury-shimmer p-4 rounded-2xl text-left transition-all border backdrop-blur-xl cursor-pointer ${
              activeTab === 'rebate'
                ? 'bg-white/10 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.35)] scale-[1.02]'
                : 'bg-white/5 border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${activeTab === 'rebate' ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.5)]' : 'bg-white/5 text-slate-400 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10'}`}>
                <DollarSign className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">MODUL 02</span>
                <span className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">Self-Rebate System</span>
              </div>
            </div>
          </button>

          <button
            type="button"
            id="vip-tab-track"
            onClick={() => setActiveTab('track')}
            className={`group btn-luxury-shimmer p-4 rounded-2xl text-left transition-all border backdrop-blur-xl cursor-pointer ${
              activeTab === 'track'
                ? 'bg-white/10 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.35)] scale-[1.02]'
                : 'bg-white/5 border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${activeTab === 'track' ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.5)]' : 'bg-white/5 text-slate-400 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10'}`}>
                <BarChart2 className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">MODUL 03</span>
                <span className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">Track Record & Data</span>
              </div>
            </div>
          </button>

          <button
            type="button"
            id="vip-tab-proof"
            onClick={() => setActiveTab('proof')}
            className={`group btn-luxury-shimmer p-4 rounded-2xl text-left transition-all border backdrop-blur-xl cursor-pointer ${
              activeTab === 'proof'
                ? 'bg-white/10 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.35)] scale-[1.02]'
                : 'bg-white/5 border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${activeTab === 'proof' ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.5)]' : 'bg-white/5 text-slate-400 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10'}`}>
                <ImageIcon className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">MODUL 04</span>
                <span className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">Galeri Bukti Setup</span>
              </div>
            </div>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-6 sm:p-8 relative min-h-[420px] shadow-2xl reveal-on-scroll reveal-delay-2">
          {/* TAB 1: APA YANG KAMI PROVIDE */}
          {activeTab === 'provide' && (
            <div className="animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-all backdrop-blur-md reveal-on-scroll reveal-delay-1">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center font-mono font-bold mb-4">
                    01
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Daily Institutional Setups</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Setiap pagi sebelum pembukaan sesi London dan New York, pasukan kuantitatif OWLFX memuat naik
                    analisis terperinci zon pesanan institusi (Gold, Currencies, Index).
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-slate-400 font-mono">
                    <li className="flex items-center space-x-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Entry Precise Limit / Market Order</span>
                    </li>
                    <li className="flex items-center space-x-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Titik Stop Loss Maksimum 25 Pips (Gold)</span>
                    </li>
                    <li className="flex items-center space-x-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Pelan Skala TP1, TP2, & TP3 Dinamik</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#06B6D4]/30 transition-all backdrop-blur-md reveal-on-scroll reveal-delay-2">
                  <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 flex items-center justify-center font-mono font-bold mb-4">
                    02
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Risk Management Blueprint</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Kunci kelangsungan akaun dagangan ialah nisbah risiko yang terkawal. Kami membekalkan kalkulator
                    saiz lot automatik dan panduan modal untuk mengelakkan 'margin call'.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-slate-400 font-mono">
                    <li className="flex items-center space-x-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Risiko terhad 1% - 2% setiap posisi</span>
                    </li>
                    <li className="flex items-center space-x-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Prosedur Breakeven automatik selepas TP1</span>
                    </li>
                    <li className="flex items-center space-x-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Perlindungan drawdown pasaran berimpak tinggi</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all backdrop-blur-md reveal-on-scroll reveal-delay-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold mb-4">
                    03
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">High-Probability Zone</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Pengesanan zon Order Block dan Liquidity Sweep yang hanya diambil apabila algoritma OWL ALGO
                    menunjukkan persetujuan pelbagai kerangka masa (Multi-Timeframe Confluence).
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-slate-400 font-mono">
                    <li className="flex items-center space-x-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Penapisan zon palsu (Fakeout filter)</span>
                    </li>
                    <li className="flex items-center space-x-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Konfluens penunjuk volum kuantitatif</span>
                    </li>
                    <li className="flex items-center space-x-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Peringatan terus ke Telegram VIP rasmi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SELF-REBATE SYSTEM */}
          {activeTab === 'rebate' && (
            <div className="animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4 reveal-on-scroll reveal-delay-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-mono font-bold tracking-wider">
                    100% PULANGAN REBAT TUNAI TELUS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Setiap Lot Yang Anda Dagangkan Membawa Pulangan Tunai
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Berbeza dengan model IB konvensional di mana komisen disimpan oleh pengantara, sistem Valetax MIB
                    di bawah naungan OWLFX membolehkan anda menikmati rebat pulangan tunai terus ke dompet akaun anda.
                    Menang atau kalah dagangan anda, rebat tetap dikira dan boleh dikeluarkan bila-bila masa!
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 font-mono text-xs backdrop-blur-md">
                    <div className="flex justify-between text-slate-300">
                      <span>Model Pembayaran:</span>
                      <span className="text-[#D4AF37] font-bold">Harian / Serta-merta (Instant Payout)</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Kadar Rebat Standard:</span>
                      <span className="text-white font-bold">Hingga $10 - $15 / Lot Pusingan</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Integrasi Akaun:</span>
                      <span className="text-[#06B6D4] font-bold">Akaun Valetax</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Rebate Calculator */}
                <div className="lg:col-span-6 p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-[#D4AF37]/40 shadow-2xl reveal-on-scroll reveal-delay-2">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div className="flex items-center space-x-2 text-white font-bold text-sm">
                      <Calculator className="w-4 h-4 text-[#D4AF37]" />
                      <span>Kalkulator Anggaran Rebat Tunai Anda</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold tracking-[0.2em] uppercase">LIVE CALCULATOR</span>
                  </div>

                  {/* Slider Control */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                        <span>Anggaran Volum Dagangan Sebulan:</span>
                        <span className="text-lg font-bold text-white font-mono">{tradedLots} Lots</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="250"
                        step="5"
                        value={tradedLots}
                        onChange={(e) => setTradedLots(Number(e.target.value))}
                        className="w-full accent-[#D4AF37] h-2 bg-white/10 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                        <span>5 Lots</span>
                        <span>100 Lots</span>
                        <span>250+ Lots</span>
                      </div>
                    </div>

                    {/* Rebate rate toggle */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Peringkat Rebat Lot:</span>
                      <div className="flex space-x-1.5">
                        {[8, 10, 12, 15].map((rate) => (
                          <button
                            key={rate}
                            type="button"
                            onClick={() => setRebatePerLot(rate)}
                            className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                              rebatePerLot === rate
                                ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                            }`}
                          >
                            ${rate}/lot
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Output Display Cards */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">ANGGARAN REBAT (USD)</span>
                      <span className="text-2xl font-black font-mono text-emerald-400">
                        ${monthlyRebateUSD.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Dikreditkan bulanan</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">NILAI RINGGIT (MYR)</span>
                      <span className="text-2xl font-black font-mono text-[#D4AF37]">
                        RM {Math.round(monthlyRebateMYR).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                        ≈ Rp {(monthlyRebateIDR / 1000000).toFixed(1)} Juta
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRACK RECORD & RESULTS */}
          {activeTab === 'track' && (
            <div className="animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 reveal-on-scroll reveal-delay-1">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Purata Winrate YTD</span>
                  <div className="text-3xl font-black font-mono text-emerald-400 mt-1">82.4%</div>
                  <span className="text-[10px] text-slate-500 font-mono">Daripada 1,420+ Posisi</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Risk : Reward Ratio</span>
                  <div className="text-3xl font-black font-mono text-[#D4AF37] mt-1">1 : 3.4</div>
                  <span className="text-[10px] text-slate-500 font-mono">Disiplin Stop Loss Ketat</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Max Drawdown</span>
                  <div className="text-3xl font-black font-mono text-sky-400 mt-1">4.2%</div>
                  <span className="text-[10px] text-slate-500 font-mono">Pengurusan Modal Teguh</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Jumlah Pips Dijana</span>
                  <div className="text-3xl font-black font-mono text-white mt-1">+14,850</div>
                  <span className="text-[10px] text-slate-500 font-mono">Bagi Q1 2026</span>
                </div>
              </div>

              {/* Monthly Visual Progress Breakdown */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-white/5 reveal-on-scroll reveal-delay-2">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                    <span>Laporan Prestasi Bulanan 2026 (Audit Terbuka)</span>
                  </h4>
                  <span className="text-xs font-mono text-[#10B981] font-bold">100% DISAHKAN</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Januari 2026 — Winrate 84.1%</span>
                      <span className="text-emerald-400 font-bold">+3,940 Pips (+$48,200)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#D4AF37] to-emerald-400 h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Februari 2026 — Winrate 81.8%</span>
                      <span className="text-emerald-400 font-bold">+4,210 Pips (+$56,400)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#D4AF37] to-emerald-400 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Mac 2026 (Semasa) — Winrate 83.0%</span>
                      <span className="text-emerald-400 font-bold">+6,700 Pips (+$74,900)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#D4AF37] to-emerald-400 h-2 rounded-full" style={{ width: '83%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GALERI BUKTI & SETUP MT4/MT5 */}
          {activeTab === 'proof' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-slate-300">
                  Klik mana-mana tangkap layar setup untuk paparan pembesar skrin penuh (Lightbox HD).
                </p>
                <span className="text-xs font-mono text-[#D4AF37]">4 Setup Terkini</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {INITIAL_SETUP_PROOFS.map((proof, idx) => (
                  <div
                    key={proof.id}
                    id={`proof-card-${proof.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleProofClick(idx);
                    }}
                    onAuxClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className={`group relative rounded-xl overflow-hidden bg-slate-900 border border-white/10 hover:border-[#D4AF37]/60 transition-all cursor-pointer shadow-lg reveal-on-scroll reveal-delay-${idx + 1}`}
                  >
                    <div className="relative h-44 w-full overflow-hidden">
                      <img
                        src={proof.imageUrl}
                        alt={proof.pair}
                        referrerPolicy="no-referrer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleProofClick(idx);
                        }}
                        onAuxClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>

                      <div className="absolute top-2 left-2 flex items-center space-x-1.5 pointer-events-none">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            proof.type === 'BUY'
                              ? 'bg-emerald-500/90 text-slate-950'
                              : 'bg-rose-500/90 text-white'
                          }`}
                        >
                          {proof.type}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/60 text-white border border-white/10">
                          {proof.pair}
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs font-mono pointer-events-none">
                        <span className="font-bold text-emerald-400">{proof.gainPips}</span>
                        <span className="text-slate-300 font-medium">RR {proof.rrRatio}</span>
                      </div>

                      {/* Hover zoom overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="p-2 rounded-full bg-[#D4AF37] text-slate-950 shadow-xl">
                          <ZoomIn className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 text-[11px] text-slate-400 font-mono line-clamp-2">
                      {proof.chartDescription}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
