export interface AdminGlobalState {
  isAutoWriterActive: boolean;
  scheduledTime: string;
  discardedDraftIds: string[];
  publishedDrafts: any[];
}

const CF_WORKER_URL = 'https://dvsynckv.dvanalytics-dev.workers.dev/';
const CF_ACCOUNT_ID = '6b38be060a58cecaf31c599db7515ebb';
const CF_NAMESPACE_ID = '8ed142044c154a6b99cf11addb94b7ac';
const CF_API_TOKEN = 'cfat_PuTv5vIghICQhhM7dwf8GzbTlEPlP0yIb646l52I86c440e9';
const KEY_NAME = 'admin_global_state';

const STORAGE_KEY = 'dv_admin_global_state_v1';
const CF_DIRECT_KV_URL = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${CF_NAMESPACE_ID}/values/${KEY_NAME}`;

const defaultState: AdminGlobalState = {
  isAutoWriterActive: false,
  scheduledTime: '13:00',
  discardedDraftIds: [],
  publishedDrafts: [],
};

const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window ? new BroadcastChannel('dv_admin_sync_channel') : null;

export function subscribeToAdminState(callback: (state: AdminGlobalState) => void): () => void {
  if (syncChannel) {
    const handler = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        callback(event.data as AdminGlobalState);
      }
    };
    syncChannel.addEventListener('message', handler);
    return () => syncChannel.removeEventListener('message', handler);
  }
  return () => {};
}

export async function fetchGlobalAdminState(): Promise<AdminGlobalState> {
  // 1. Try Cloudflare Worker Endpoint
  try {
    const response = await fetch(CF_WORKER_URL, { method: 'GET' });
    if (response.ok) {
      const rawText = await response.text();
      const remoteState = JSON.parse(rawText);
      if (remoteState && typeof remoteState === 'object') {
        const mergedState: AdminGlobalState = {
          isAutoWriterActive: Boolean(remoteState.isAutoWriterActive),
          scheduledTime: remoteState.scheduledTime || '13:00',
          discardedDraftIds: Array.isArray(remoteState.discardedDraftIds) ? remoteState.discardedDraftIds : [],
          publishedDrafts: Array.isArray(remoteState.publishedDrafts) ? remoteState.publishedDrafts : [],
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedState));
        return mergedState;
      }
    }
  } catch (err) {
    // Ignore worker fetch errors
  }

  // 2. Try Direct Cloudflare API
  try {
    const response = await fetch(CF_DIRECT_KV_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
      },
    });

    if (response.ok) {
      const rawText = await response.text();
      const remoteState = JSON.parse(rawText);
      if (remoteState && typeof remoteState === 'object') {
        const mergedState: AdminGlobalState = {
          isAutoWriterActive: Boolean(remoteState.isAutoWriterActive),
          scheduledTime: remoteState.scheduledTime || '13:00',
          discardedDraftIds: Array.isArray(remoteState.discardedDraftIds) ? remoteState.discardedDraftIds : [],
          publishedDrafts: Array.isArray(remoteState.publishedDrafts) ? remoteState.publishedDrafts : [],
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedState));
        return mergedState;
      }
    }
  } catch (err) {
    // Ignore direct API errors
  }

  // 3. Fallback to LocalStorage
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) return JSON.parse(local);
  } catch (err) {
    // Ignore parse errors
  }

  return defaultState;
}

export async function saveGlobalAdminState(state: AdminGlobalState): Promise<boolean> {
  // Save to local storage first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  // Broadcast to other open tabs in real-time
  if (syncChannel) {
    try {
      syncChannel.postMessage(state);
    } catch (e) {
      // Ignore broadcast error
    }
  }

  let success = false;

  // Try Worker Endpoint
  try {
    const response = await fetch(CF_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
    if (response.ok) success = true;
  } catch (err) {
    // Ignore worker error
  }

  // Try Direct KV API if worker didn't succeed
  if (!success) {
    try {
      const response = await fetch(CF_DIRECT_KV_URL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${CF_API_TOKEN}`,
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(state),
      });
      const resJson = await response.json();
      if (resJson && resJson.success) success = true;
    } catch (err) {
      // Ignore direct KV error
    }
  }

  return success;
}
