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
const leadOriginStorageKey = 'dv_lead_origin';
const gtmContainerId = (import.meta.env.VITE_GTM_ID as string | undefined) || 'GTM-NFB3LVLT';
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
export const GOOGLE_ADS_TAG_ID = 'G-PBJWHBZLGX';
let lastTrackedPageLocation = '';

/**
 * Initializes Google tag (gtag.js) for Google Ads conversion tracking on landing pages & thank-you pages
 */
export const ensureGoogleTagLoaded = (tagId: string = GOOGLE_ADS_TAG_ID) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }

  // Ensure config command has been dispatched for the tagId
  const scriptSelector = `script[src*="googletagmanager.com/gtag/js?id=${tagId}"]`;
  if (!document.querySelector(scriptSelector)) {
    window.gtag('js', new Date());
    window.gtag('config', tagId);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
    document.head.appendChild(script);
  }
};

/**
 * Dispatches a Google Ads conversion event
 */
export const trackGoogleAdConversion = (sendToId: string) => {
  if (typeof window === 'undefined') return;
  ensureGoogleTagLoaded(GOOGLE_ADS_TAG_ID);
  window.gtag?.('event', 'conversion', {
    send_to: sendToId,
  });
};

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

export const getWebsiteLeadSource = () => {
  const path = window.location.pathname.toLowerCase();
  if (path === '/lp' || path.startsWith('/lp/')) {
    window.sessionStorage.setItem(leadOriginStorageKey, 'Google Paid');
    return 'Google Paid';
  }

  return window.sessionStorage.getItem(leadOriginStorageKey) || 'Google Organic';
};

export const appendAttributionToPayload = (payload: URLSearchParams) => {
  const attribution = getAttribution();
  Object.entries(attribution).forEach(([key, value]) => {
    payload.set(key, value);
  });
  const leadSource = getWebsiteLeadSource();
  payload.set('lead_source', leadSource);
  payload.set('traffic_source', 'Google');
  payload.set('traffic_medium', leadSource === 'Google Paid' ? 'Paid' : 'Organic');
  payload.set('landing_page_url', window.location.origin + window.location.pathname);
  payload.set('current_page_url', window.location.href);
  payload.set('referrer', document.referrer);
};

export const initAnalytics = () => {
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }

  // Fallback dynamic injection if GTM script was not present statically in HTML
  if (gtmContainerId && !document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.dataset.gtmId = gtmContainerId;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmContainerId)}`;
    document.head.appendChild(script);
  }
};

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
  const eventPayload = {
    page_path: window.location.pathname,
    page_location: window.location.href,
    ...params,
  };

  // Push standard GTM Data Layer event object
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventPayload,
  });

  // Backward compatibility for gtag
  window.gtag?.('event', eventName, eventPayload);

  // Automatically dispatch standard conversion Key Events for lead forms & contact clicks
  if (['submit_get_a_call_form', 'submit_enroll_form', 'submit_brochure_form'].includes(eventName)) {
    const leadType = eventName.replace('submit_', '').replace('_form', '');
    const leadPayload = {
      ...eventPayload,
      lead_type: leadType,
      value: 1,
      currency: 'INR',
    };
    window.dataLayer.push({
      event: 'generate_lead',
      ...leadPayload,
    });
    window.gtag?.('event', 'generate_lead', leadPayload);
  } else if (['click_phone', 'click_whatsapp', 'click_email'].includes(eventName)) {
    const contactMethod = eventName.replace('click_', '');
    const contactPayload = {
      ...eventPayload,
      contact_method: contactMethod,
    };
    window.dataLayer.push({
      event: 'contact',
      ...contactPayload,
    });
    window.gtag?.('event', 'contact', contactPayload);
  }
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

  // Push virtual page_view event to GTM Data Layer on SPA client navigation
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    ...payload,
  });

  window.gtag?.('event', 'page_view', payload);
  if (gaMeasurementId) {
    window.gtag?.('config', gaMeasurementId, {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
};
