import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

// High-definition luxury fallback images that never fail CORS/hotlink
export const LUXURY_FALLBACK_IMAGES = {
  ballroom: 'https://i.imgur.com/aCQ6hLX.jpg',
  conference: 'https://drive.google.com/file/d/1tm2SG-Y3tJya5AjgYDkOipVLD3VyxZRX/view?usp=drive_link',
  trading: 'https://drive.google.com/file/d/1tm2SG-Y3tJya5AjgYDkOipVLD3VyxZRX/view?usp=drive_link',
  workshop: 'https://drive.google.com/file/d/1tm2SG-Y3tJya5AjgYDkOipVLD3VyxZRX/view?usp=drive_link',
  gala: 'https://drive.google.com/file/d/1tm2SG-Y3tJya5AjgYDkOipVLD3VyxZRX/view?usp=drive_link',
  default: 'https://drive.google.com/file/d/1tm2SG-Y3tJya5AjgYDkOipVLD3VyxZRX/view?usp=drive_link'
};

interface ShimmerImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  containerClassName?: string;
  imageClassName?: string;
  badgeLabel?: string;
  showShimmerBadge?: boolean;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
}

export const ShimmerImage: React.FC<ShimmerImageProps> = ({
  src,
  alt,
  fallbackSrc = LUXURY_FALLBACK_IMAGES.ballroom,
  containerClassName = 'relative w-full h-full overflow-hidden',
  imageClassName = 'w-full h-full object-cover',
  badgeLabel,
  showShimmerBadge = true,
  priority = false,
  loading,
  ...restProps
}) => {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync currentSrc when src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setImgLoaded(false);
    setImgError(false);
  }, [src]);

  // Handle cached image already complete on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setImgLoaded(true);
      } else if (imgRef.current.naturalWidth === 0 && currentSrc === src && fallbackSrc && fallbackSrc !== src) {
        // Cached failed image, switch to fallback
        setCurrentSrc(fallbackSrc);
      }
    }
  }, [currentSrc, fallbackSrc, src]);

  const handleLoad = () => {
    setImgLoaded(true);
  };

  const handleError = () => {
    // If primary src failed and fallback is available and not yet tried
    if (currentSrc !== fallbackSrc && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImgLoaded(false);
    } else {
      setImgError(true);
      setImgLoaded(true);
    }
  };

  const effectiveLoading = loading || (priority ? 'eager' : 'lazy');

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onAuxClick={(e) => e.preventDefault()}
    >
      {/* Shimmer Skeleton during loading */}
      {!imgLoaded && !imgError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 skeleton-shimmer-luxury flex flex-col items-center justify-center p-3 select-none pointer-events-none transition-opacity duration-300"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-[#D4AF37]/40 flex items-center justify-center shadow-xl">
              <ImageIcon className="w-5 h-5 text-[#D4AF37] animate-pulse" />
            </div>
            {showShimmerBadge && (
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/95 border border-[#D4AF37]/30 text-[9px] font-mono text-slate-300 shadow-md">
                <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                <span className="tracking-wider">{badgeLabel || 'OWLFX MEDIA'}</span>
              </div>
            )}
          </div>

          {/* Scanning gold line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent animate-pulse" />
        </div>
      )}

      {/* Dark Luxury Fallback Card if image completely fails */}
      {imgError && (
        <div className="absolute inset-0 z-10 bg-slate-950/95 border border-white/10 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#D4AF37]/30 flex items-center justify-center mb-2 shadow-lg">
            <ImageIcon className="w-5 h-5 text-[#D4AF37]/70" />
          </div>
          <span className="text-xs text-white font-bold font-mono tracking-wide">
            {badgeLabel || 'Aktiviti Wilayah Akan Dikemaskini'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono mt-1">
            Dokumentasi Rasmi OWLFX HD
          </span>
        </div>
      )}

      {/* Actual Responsive Image */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={effectiveLoading}
        decoding="async"
        // @ts-ignore fetchPriority support in React
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onAuxClick={(e) => e.preventDefault()}
        onLoad={handleLoad}
        onError={handleError}
        className={`${imageClassName} select-none transition-opacity duration-500 ease-out ${
          imgLoaded && !imgError ? 'opacity-100' : 'opacity-0'
        }`}
        {...restProps}
      />
    </div>
  );
};

