import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'Visitation Rosaries - Handcrafted Prayer Rosaries & Bracelets',
  description = 'Discover beautiful handcrafted rosaries and prayer bracelets made with devotion. Shop our collection of wood, crystal, and metal rosaries. Custom designs available.',
  keywords = 'rosary, prayer beads, catholic rosary, handmade rosary, custom rosary, prayer bracelet, religious gifts, spiritual gifts',
  image = 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=1200&q=80',
  url = 'https://visitationrosaries.com',
  type = 'website'
}: SEOProps) {
  const fullTitle = title.includes('Visitation Rosaries') ? title : `${title} | Visitation Rosaries`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Visitation Rosaries" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
