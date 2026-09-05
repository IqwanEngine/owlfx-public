import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; caption?: string; title?: string }[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentItem = images[currentIndex];

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-6 md:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="lightbox-container"
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        onAuxClick={(e) => e.preventDefault()}
      >
        {/* Top bar controls */}
        <div className="w-full flex items-center justify-between pb-3 text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#D4AF37]/20 text-[#F59E0B] border border-[#D4AF37]/40">
              OWLFX ARCHIVE
            </span>
            <span className="font-mono text-xs">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="lightbox-close-btn"
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-red-950 hover:text-red-400 text-slate-300 transition-colors border border-white/10 cursor-pointer"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image preview frame */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0A0F1D] shadow-2xl flex items-center justify-center max-h-[72vh]"
          onAuxClick={(e) => e.preventDefault()}
        >
          <img
            src={currentItem.url}
            alt={currentItem.caption || 'OWLFX High-Resolution Preview'}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl select-none cursor-default"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onAuxClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />

          {/* Nav arrows */}
          {currentIndex > 0 && (
            <button
              id="lightbox-prev-btn"
              type="button"
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              id="lightbox-next-btn"
              type="button"
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Caption */}
        {currentItem.caption && (
          <div className="mt-4 text-center max-w-2xl px-4 py-2 rounded-xl bg-slate-900/80 border border-white/5 backdrop-blur-md">
            <p className="text-sm text-slate-200 font-medium">{currentItem.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

