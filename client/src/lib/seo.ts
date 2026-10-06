import { useEffect } from 'react';

// ============================================================
// TrendlyInside - Client-side SEO
// Keeps per-route title/description/canonical/OG in sync.
// ============================================================

export const SITE_URL = 'https://trendlyinside.com';
export const SITE_NAME = 'TrendlyInside';

export interface SEOOptions {
  /** Page title. The site name is appended automatically unless already present. */
  title: string;
  description: string;
  /** Route path, e.g. "/hook-generator". Used for the canonical URL. */
  path?: string;
  /** OpenGraph type. Defaults to "website". */
  type?: 'website' | 'article';
  /** Optional Schema.org structured data injected as JSON-LD. */
  structuredData?: Record<string, unknown>;
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
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Applies route-level SEO metadata. Safe to call from any page component.
 */
export function useSEO({ title, description, path, type = 'website', structuredData }: SEOOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const url = path ? `${SITE_URL}${path}` : SITE_URL;

    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', type);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertLink('canonical', url);

    // Per-route structured data, cleaned up on unmount
    const SCRIPT_ID = 'route-jsonld';
    if (structuredData) {
      let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [title, description, path, type, structuredData]);
}

/** Shared FAQ Page structured data builder. */
export function buildFaqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
