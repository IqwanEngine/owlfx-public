import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, User, Mail, Phone, MapPin, Send } from 'lucide-react';

export type RegistrationTabType =
  | 'my-community'
  | 'id-community'
  | 'my-ib'
  | 'id-ib'
  | 'valetax'
  | 'lifestyle';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: RegistrationTabType;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'my-community',
}) => {
  const [activeTab, setActiveTab] = useState<RegistrationTabType>(defaultTab);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tradingExp, setTradingExp] = useState('1 - 3 Tahun');
  const [tradingViewUser, setTradingViewUser] = useState('');
  const [stateOrCity, setStateOrCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync default tab if changed externally
  React.useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setTradingViewUser('');
    setStateOrCity('');
  };

  const getFormTitle = () => {
    switch (activeTab) {
      case 'my-community':
        return {
          title: 'Pendaftaran Komuniti VIP Malaysia',
          path: '/my/register',
          flag: '🇲🇾',
          desc: 'Akses percuma ke Setup Harian Institusi, kalkulator Self-Rebate, dan Telegram VIP.'
        };
      case 'id-community':
        return {
          title: 'Pendaftaran Komunitas VIP Indonesia',
          path: '/id/register',
          flag: '🇮🇩',
          desc: 'Bergabung bersama ribuan trader Indonesia dengan deposit/withdrawal lokal kilat.'
        };
      case 'my-ib':
        return {
          title: 'Pendaftaran Introducing Broker (IB) Malaysia',
          path: '/my/ib_development',
          flag: '🇲🇾',
          desc: 'Bina agensi komisen anda sendiri, nikmati geran dewan latihan, dan komisen tertinggi.'
        };
      case 'id-ib':
        return {
          title: 'Pendaftaran Mitra IB Indonesia',
          path: '/id/ib_development',
          flag: '🇮🇩',
          desc: 'Akses program pengembangan IB Nusantara dengan dukungan materi workshop lengkap.'
        };
      case 'valetax':
        return {
          title: 'Pembukaan Akaun Valetax MIB & Lesen ALGO',
          path: '/my/register',
          flag: '⚡',
          desc: 'Aktifkan petunjuk TradingView OWL ALGO percuma dan sistem pulangan rebat.'
        };
      case 'lifestyle':
        return {
          title: 'Pendaftaran OWLFX Lifestyle & Event',
          path: '/my/register',
          flag: '💎',
          desc: 'Sertai komuniti gaya hidup mewah dan acara eksklusif OWLFX.'
        };
    }
  };

  const meta = getFormTitle();

  return (
    <div
      id="registration-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="registration-modal-card"
        className="relative max-w-2xl w-full rounded-3xl bg-[#090E1D] border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#38BDF8] to-[#2563EB]"></div>

        {/* Close Button */}
        <button
          id="registration-modal-close"
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Selection */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 mb-6 text-xs font-mono border-b border-white/10">
          <button
            type="button"
            onClick={() => { setActiveTab('my-community'); resetForm(); }}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'my-community'
                ? 'bg-blue-900/60 text-[#38BDF8] border border-blue-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇲🇾 Komuniti MY
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('id-community'); resetForm(); }}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'id-community'
                ? 'bg-red-900/60 text-red-300 border border-red-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇮🇩 Komunitas ID
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('my-ib'); resetForm(); }}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'my-ib'
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇲🇾 IB Malaysia
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('id-ib'); resetForm(); }}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'id-ib'
                ? 'bg-rose-900/60 text-rose-300 border border-rose-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇮🇩 IB Indonesia
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('valetax'); resetForm(); }}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'valetax'
                ? 'bg-emerald-900/60 text-emerald-400 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ OWLFX
          </button>
        </div>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#D4AF37] mb-1">
            <span className="text-base">{meta.flag}</span>
            <span className="uppercase">{meta.path}</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            {meta.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {meta.desc}
          </p>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="py-10 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Permohonan Berjaya Diterima!</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Terima kasih, <strong className="text-white">{fullName || 'Trader'}</strong>. Pegawai perhubungan
              OWLFX Desk telah menghantar pautan pengesahan dan jemputan VIP melalui WhatsApp/Emel anda.
            </p>
            <div className="pt-4 flex justify-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs shadow-lg"
              >
                Selesai & Tutup
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
              >
                Daftar Akaun Lain
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Nama Penuh (Mengikut IC/Pasport) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="cth: Ahmad Farhan"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Alamat Emel Aktif *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Nombor WhatsApp (Untuk Akses VIP Desk) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={activeTab.includes('id') ? '+62 812 3456 7890' : '+60 12 345 6789'}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Negeri / Kota Kediaman
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={stateOrCity}
                    onChange={(e) => setStateOrCity(e.target.value)}
                    placeholder={activeTab.includes('id') ? 'cth: Surabaya / Jakarta' : 'cth: Kelantan / Selangor'}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Pengalaman Dagangan
                </label>
                <select
                  value={tradingExp}
                  onChange={(e) => setTradingExp(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option>Baru Bermula (&lt; 1 Tahun)</option>
                  <option>1 - 3 Tahun (Konsisten)</option>
                  <option>3 - 5 Tahun (Advance)</option>
                  <option>Master IB / Pengurus Komuniti (&gt; 5 Tahun)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  TradingView Username (Untuk Lesen ALGO)
                </label>
                <input
                  type="text"
                  value={tradingViewUser}
                  onChange={(e) => setTradingViewUser(e.target.value)}
                  placeholder="cth: trader_quant99"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Terms and Security Notice */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-start space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                Data anda dilindungi di bawah protokol penyulitan institusi. Pendaftaran di bawah MIB Valetax
                melayakkan anda menerima rebat tunai secara terus ke akaun trade anda.
              </span>
            </div>

            {/* Action Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group btn-luxury-shimmer btn-gold-luxury w-full py-4 rounded-xl text-slate-950 font-extrabold text-xs tracking-wider uppercase bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#F59E0B] border border-amber-300/60 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sedang Memproses Sambungan...</span>
                ) : (
                  <>
                    <span>Hantar Pendaftaran Rasmi</span>
                    <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
