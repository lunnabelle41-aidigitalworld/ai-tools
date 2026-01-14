import Head from 'next/head';
import { useRouter } from 'next/router';

type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  article?: boolean;
  keywords?: string[];
  publishDate?: string;
  modifiedDate?: string;
  author?: string;
  schema?: any;
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  image = '/images/og-image.jpg',
  article = false,
  keywords = ['AI tools', 'artificial intelligence', 'machine learning'],
  publishDate,
  modifiedDate,
  author,
  schema,
}) => {
  const router = useRouter();
  const siteUrl = 'https://yourwebsite.com'; // Replace with your actual domain
  const pageUrl = `${siteUrl}${router.asPath}`;
  const defaultImage = `${siteUrl}${image}`;
  const siteName = 'AI Tools Hub'; // Replace with your site name

  // Default schema for organization
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      {/* Standard SEO Meta Tags */}
      <Head>
        <title>{`${title} | ${siteName}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical || pageUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={article ? 'article' : 'website'} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${title} | ${siteName}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content={siteName} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yoursite" />
        <meta name="twitter:creator" content="@yourtwitter" />
        
        {/* Additional Meta Tags */}
        <meta name="keywords" content={keywords.join(', ')} />
        <meta name="author" content={author || siteName} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema || defaultSchema),
          }}
        />
        {publishDate && (
          <meta property="article:published_time" content={publishDate} />
        )}
        {modifiedDate && (
          <meta property="article:modified_time" content={modifiedDate} />
        )}
      </Head>
    </>
  );
};

export default SEO;
