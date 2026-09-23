import React, { useEffect } from 'react';

export default function NewsTerminal() {
  // Hide document body scrolling when terminal is active to ensure a true fullscreen standalone feel
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] w-screen h-screen bg-[#0B0E14] overflow-hidden">
      <iframe 
        src="/news_terminal/index.html" 
        className="w-full h-full border-none outline-none bg-[#0B0E14]"
        title="OWLFX News Terminal"
        allowFullScreen
      />
    </div>
  );
}
