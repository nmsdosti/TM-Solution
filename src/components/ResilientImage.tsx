import { useState } from 'react';
import { Activity } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#071D36] via-[#0C2A4D] to-[#133A66] text-white p-6 text-center ${className}`}
      >
        <div className="w-11 h-11 rounded-lg bg-[#F5B51B]/15 border border-[#F5B51B]/30 flex items-center justify-center mb-3">
          <Activity className="w-5 h-5 text-[#F5B51B]" aria-hidden="true" />
        </div>
        <span className="font-display font-semibold text-sm tracking-wide text-white/90">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
