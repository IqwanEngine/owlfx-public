import React, { useState } from 'react';
import { LiveEventAlertData } from '../types';
import { MapPin, Calendar, Zap, X, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface LiveEventAlertProps {
  alerts: LiveEventAlertData[];
}

/**
 * Checks if the event date has already passed.
 * Supports multiple formats: DD/MM/YYYY, YYYY-MM-DD, D/M/YYYY, Malay month names, etc.
 */
export function isEventExpired(dateStr: string): boolean {
  if (!dateStr || !dateStr.trim()) return false;
  const trimmed = dateStr.trim();

  // Try parsing DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = trimmed.match(/^(\d{1,2})[\/\.-](\d{1,2})[\/\.-](\d{4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    const eventDate = new Date(year, month, day, 23, 59, 59, 999);
    return Date.now() > eventDate.getTime();
  }

  // Try parsing YYYY-MM-DD
  const ymdMatch = trimmed.match(/^(\d{4})[\/\.-](\d{1,2})[\/\.-](\d{1,2})$/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    const eventDate = new Date(year, month, day, 23, 59, 59, 999);
    return Date.now() > eventDate.getTime();
  }

  // Malay month name detection (e.g., "19 September 2026")
  const malayMonths: Record<string, number> = {
    jan: 0, januari: 0,
    feb: 1, februari: 1,
    mac: 2, mar: 2, march: 2,
    apr: 3, april: 3,
    mei: 4, may: 4,
    jun: 5, june: 5,
    jul: 6, julai: 6, july: 6,
    ogo: 7, ogos: 7, aug: 7, august: 7,
    sep: 8, september: 8, sept: 8,
    okt: 9, oktober: 9, oct: 9, october: 9,
    nov: 10, november: 10,
    dis: 11, disember: 11, dec: 11, december: 11
  };
  const parts = trimmed.toLowerCase().split(/\s+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10);
    const monthKey = parts[1];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(year) && malayMonths[monthKey] !== undefined) {
      const eventDate = new Date(year, malayMonths[monthKey], day, 23, 59, 59, 999);
      return Date.now() > eventDate.getTime();
    }
  }

  // Standard date parsing fallback
  const parsed = Date.parse(trimmed);
  if (!isNaN(parsed)) {
    const d = new Date(parsed);
    d.setHours(23, 59, 59, 999);
    return Date.now() > d.getTime();
  }

  // If format cannot be strictly verified as past, keep active
  return false;
}

export const LiveEventAlert: React.FC<LiveEventAlertProps> = ({ alerts }) => {
  // STRICT RULE 1: JANGAN simpan status "tutup (X)" pelawat ke dalam localStorage/sessionStorage.
  // Gunakan useState(false) biasa: bila refresh (F5), popup notifikasi aktif kembali muncul.
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Filter only active & non-expired events
  const activeAlerts = (alerts || []).filter(
    (item) => item && item.isActive && !isEventExpired(item.date)
  );

  // Guard: No active alerts or visitor temporarily dismissed
  if (activeAlerts.length === 0 || isDismissed) {
    return null;
  }

  const safeIndex = currentIndex >= activeAlerts.length ? 0 : currentIndex;
  const currentAlert = activeAlerts[safeIndex];

  if (!currentAlert) return null;

  // WhatsApp link construction with dynamic encoded event info
  const waMsg = encodeURIComponent(
    `Hai, saya nak join kelas ${currentAlert.eventName || 'OWLFX'} di ${currentAlert.location || ''}, ${currentAlert.state || ''} (Tarikh: ${currentAlert.date || ''}).`
  );
  const whatsappUrl = `http://wasap.my/+60102263677/(Website)${waMsg}`;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeAlerts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeAlerts.length) % activeAlerts.length);
  };

  return (
    <aside
      id="live-floating-event-alert"
      role="complementary"
      aria-label="Pengumuman Acara Langsung OWLFX"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[360px] w-[calc(100%-2rem)] bg-slate-950/90 backdrop-blur-xl border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.25)] rounded-2xl p-4 sm:p-5 text-white transition-all duration-500 animate-in fade-in slide-in-from-bottom-5"
    >
      {/* Header Alert: Status Indicator + Badge + Multi-alert Pager + Close Button */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center min-w-0 pr-2">
          <span className="relative flex h-2.5 w-2.5 mr-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
          <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-widest truncate">
            LIVE UPDATE: KELAS AKAN DATANG
          </span>
        </div>

        <div className="flex items-center space-x-1 shrink-0">
          {activeAlerts.length > 1 && (
            <div className="flex items-center space-x-1 mr-1.5 bg-slate-900/90 px-1.5 py-0.5 rounded-md border border-white/10 text-[10px] font-mono text-slate-400">
              <button
                type="button"
                onClick={handlePrev}
                className="hover:text-white p-0.5"
                title="Acara Sebelumnya"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <span>{safeIndex + 1}/{activeAlerts.length}</span>
              <button
                type="button"
                onClick={handleNext}
                className="hover:text-white p-0.5"
                title="Acara Seterusnya"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}

          <button
            type="button"
            id="close-live-event-alert-btn"
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Tutup Notifikasi Sesi Ini"
            aria-label="Tutup Notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dynamic Event Details */}
      <div className="pt-2.5">
        <h4 className="font-bold text-sm sm:text-base text-white mt-1 leading-snug">
          {currentAlert.eventName || 'Siri Bengkel Eksklusif OWLFX'}
        </h4>

        <div className="text-xs text-slate-300 mt-1.5 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">
            {currentAlert.location}
            {currentAlert.state ? ` • ${currentAlert.state}` : ''}
          </span>
        </div>

        <div className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>{currentAlert.date}</span>
        </div>

        {currentAlert.quota && (
          <div className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30 inline-flex items-center gap-1 mt-2 font-mono">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{currentAlert.quota}</span>
          </div>
        )}
      </div>

      {/* WhatsApp Booking CTA Button */}
      <a
        id="live-event-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        <MessageCircle className="w-4 h-4 text-slate-950" />
        <span>Tempah Kerusi via WhatsApp</span>
      </a>
    </aside>
  );
};
