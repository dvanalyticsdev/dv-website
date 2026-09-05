export interface AdminGlobalState {
  isAutoWriterActive: boolean;
  scheduledTime: string;
  discardedDraftIds: string[];
  publishedDrafts: any[];
}

const CF_ACCOUNT_ID = '6b38be060a58cecaf31c599db7515ebb';
const CF_NAMESPACE_ID = '8ed142044c154a6b99cf11addb94b7ac';
const CF_API_TOKEN = 'cfat_ujv7WOTGLBX0htvfRCZ6BWDKBTfGanUntO6Y4RMdde6bfb48';
const KEY_NAME = 'admin_global_state';

const STORAGE_KEY = 'dv_admin_global_state_v1';
const CF_KV_URL = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${CF_NAMESPACE_ID}/values/${KEY_NAME}`;

const defaultState: AdminGlobalState = {
  isAutoWriterActive: false,
  scheduledTime: '13:00',
  discardedDraftIds: [],
  publishedDrafts: [],
};

export async function fetchGlobalAdminState(): Promise<AdminGlobalState> {
  try {
    const response = await fetch(CF_KV_URL, {
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
    console.warn('Unable to fetch Cloudflare KV state, loading local cache:', err);
  }

  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) return JSON.parse(local);
  } catch (err) {
    // Ignore parse errors
  }

  return defaultState;
}

export async function saveGlobalAdminState(state: AdminGlobalState): Promise<boolean> {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  try {
    const response = await fetch(CF_KV_URL, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(state),
    });

    const resJson = await response.json();
    return Boolean(resJson && resJson.success);
  } catch (err) {
    console.warn('Unable to sync state to Cloudflare KV:', err);
    return false;
  }
}
