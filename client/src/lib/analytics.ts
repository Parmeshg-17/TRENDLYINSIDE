// ============================================================
// TrendlyInside - Privacy-First Google Analytics 4 Integration
// Supports GDPR/ePrivacy consent gating for EU, UK, and Swiss users.
// ============================================================

export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';

const CONSENT_KEY = 'trendly_cookie_consent';

export type ConsentStatus = 'granted' | 'denied' | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getCookieConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'granted' || stored === 'denied') return stored;
  return null;
}

export function setCookieConsent(status: 'granted' | 'denied') {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_KEY, status);

  if (status === 'granted') {
    initGA();
  } else if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    });
  }
}

export function initGA() {
  if (typeof window === 'undefined') return;
  if (getCookieConsent() !== 'granted') return;
  if (document.getElementById('ga-script')) return; // Already initialized

  // Inject gtag.js
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (getCookieConsent() !== 'granted') return;

  window.gtag('event', 'page_view', {
    page_path: path,
  });
}

export function trackEvent(action: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (getCookieConsent() !== 'granted') return;

  window.gtag('event', action, params);
}
