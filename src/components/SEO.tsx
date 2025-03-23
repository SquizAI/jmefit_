import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import type { WithContext, Organization, WebSite } from 'schema-dts';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string
  noindex?: boolean;
  structuredData?: WithContext<Organization | WebSite>;
}

export default function SEO({
  title = 'JmeFit Training - Transform Your Body and Mind',
  description = 'Expert-guided fitness and nutrition programs for sustainable transformation. Join our community and achieve your fitness goals.',
  image = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
  url = 'https://jmefit.com',
  type = 'website',
  noindex = false,
  structuredData
}: SEOProps) {
  const siteTitle = useMemo(() => 
    title.includes('JMEFit') ? title : `${title} | JMEFit Training`,
    [title]
  );

  const defaultStructuredData: WithContext<Organization> = useMemo(() => ({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'JmeFit Training',
      url: 'https://jmefit.com',
      logo: 'https://jmefit.com/JME_fit_black_purple.png',
      sameAs: [
        'https://instagram.com/jmefit',
        'https://facebook.com/jmefit'
      ]
    }), []);

  return (
    <Helmet prioritizeSeoTags defaultTitle="JMEFit Training">
      {/* Basic */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@jmefit" />

      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#8B5CF6" />
      
      {/* Mobile */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
}