import { useEffect } from 'react';

// ============================================================
// TrendlyInside - Client-side SEO Engine
// Manages per-route title, meta description, canonical,
// Open Graph, Twitter Cards (summary_large_image), and robots.
// ============================================================

export const SITE_URL = 'https://trendlyinside.com';
export const SITE_NAME = 'TrendlyInside';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface SEOOptions {
  /** Short, descriptive page title. The site name '| TrendlyInside' is appended automatically if omitted. */
  title: string;
  /** Unique 1-2 sentence description in plain words. */
  description: string;
  /** Route path (e.g. "/hook-generator") for canonical URL. */
  path?: string;
  /** OpenGraph type. Defaults to "website". */
  type?: 'website' | 'article';
  /** Custom 1200x630 share image URL. Defaults to /og-image.png. */
  image?: string;
  /** Mark as noindex (e.g. for /thank-you and /404). */
  noindex?: boolean;
  /** Optional structured data (kept for backward compatibility, omitted from head) */
  structuredData?: Record<string, unknown>;
}

/** No-op FAQ schema helper: Google no longer surfaces FAQ rich snippets for commercial sites */
export function buildFaqSchema(_faqs: Array<{ q: string; a: string }>) {
  return undefined;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute(rel, rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Applies route-level SEO metadata. Safe to call from any page component.
 */
export function useSEO({
  title,
  description,
  path,
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: SEOOptions) {
  useEffect(() => {
    // Format: "Page Name | TrendlyInside"
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const url = path ? `${SITE_URL}${path}` : SITE_URL;
    const shareImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    document.title = fullTitle;

    // Standard metadata
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertLink('canonical', url);

    // Open Graph
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:image', shareImage);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', `${fullTitle} share preview banner`);

    // Twitter Cards (summary_large_image)
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', shareImage);
    upsertMeta('name', 'twitter:image:alt', `${fullTitle} share preview banner`);
  }, [title, description, path, type, image, noindex]);
}
