// components/AdSense.tsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Add type definitions for adsbygoogle
declare global {
  interface Window {
    adsbygoogle?: {
      loaded?: boolean;
      push: (params: Record<string, unknown>) => void;
    }[];
  }
}

const AdSense = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.adsbygoogle = window.adsbygoogle || [];
      // No need to push an empty object - just initialize the array
      console.log('AdSense initialized');
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return null; // Only show ads in production
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      onError={(e) => {
        console.error('AdSense script failed to load', e);
      }}
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7807547542638616"
    />
  );
};

export default AdSense;