import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type BreadcrumbItem = {
  label: string;
  href: string;
  active?: boolean;
};

export const Breadcrumbs: React.FC = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      label,
      href,
      active: index === pathSegments.length - 1,
    };
  });

  // Add home as the first breadcrumb
  breadcrumbs.unshift({ label: 'Home', href: '/', active: pathSegments.length === 0 });

  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-vault.example.com'}${item.href}`
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <ol className="flex flex-wrap items-center gap-2">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {item.active ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
