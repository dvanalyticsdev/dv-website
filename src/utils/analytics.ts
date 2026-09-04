type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const trackingParamNames = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'msclkid',
];

const attributionStorageKey = 'dv_attribution';
const gaMeasurementId = 'G-827GCWFLV6';
let lastTrackedPageLocation = '';

export const getAttribution = () => {
  const params = new URLSearchParams(window.location.search);
  const attribution: Record<string, string> = {};

  trackingParamNames.forEach((name) => {
    const value = params.get(name);
    if (value) {
      attribution[name] = value;
    }
  });

  if (Object.keys(attribution).length > 0) {
    window.sessionStorage.setItem(attributionStorageKey, JSON.stringify(attribution));
    return attribution;
  }

  const storedValue = window.sessionStorage.getItem(attributionStorageKey);
  if (!storedValue) return {};

  try {
    return JSON.parse(storedValue) as Record<string, string>;
  } catch {
    return {};
  }
};

export const appendAttributionToPayload = (payload: URLSearchParams) => {
  const attribution = getAttribution();
  Object.entries(attribution).forEach(([key, value]) => {
    payload.set(key, value);
  });
  payload.set('landing_page_url', window.location.origin + window.location.pathname);
  payload.set('current_page_url', window.location.href);
  payload.set('referrer', document.referrer);
};

export const initAnalytics = () => {
  const gtmId = import.meta.env.VITE_GTM_ID as string | undefined;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => {
    window.dataLayer?.push(args);
  });

  if (gtmId && !document.querySelector(`script[data-gtm-id="${gtmId}"]`)) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.dataset.gtmId = gtmId;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }
};

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
  const eventPayload = {
    event: eventName,
    page_path: window.location.pathname,
    page_location: window.location.href,
    ...params,
  };

  window.dataLayer?.push(eventPayload);
  window.gtag?.('event', eventName, eventPayload);
};

export const trackPageView = (pageId: string) => {
  if (lastTrackedPageLocation === window.location.href) {
    return;
  }

  lastTrackedPageLocation = window.location.href;

  const payload = {
    page_id: pageId,
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  };

  window.dataLayer?.push({ event: 'page_view', ...payload });
  window.gtag?.('config', gaMeasurementId, payload);
};
