import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-vault.example.com';
  const siteName = 'AI Vault - Discover & Compare AI Tools';
  const description = 'Comprehensive directory of AI tools with detailed comparisons, user reviews, and expert recommendations to help you find the perfect AI solution.';
  const defaultImage = `${siteUrl}/images/og-default.jpg`;

  // JSON-LD structured data for the homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#111827" />
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="_xAnSYTjZ9yWZeJ4e2YXlHtZ7Of6p3A5TFCMbgDeO-I" />
        
        {/* Bing Webmaster Tools Verification */}
        <meta name="msvalidate.01" content="843BA93192F072AE3F606EF8C86137D2" />
        
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2894915343289598"
          crossOrigin="anonymous"></script>
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={defaultImage} />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteUrl} />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Main />
        <NextScript />
        
        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-TX7MKTQ49E`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TX7MKTQ49E', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </Html>
  );
}