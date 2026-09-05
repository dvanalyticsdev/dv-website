export interface AdminGlobalState {
  isAutoWriterActive: boolean;
  scheduledTime: string;
  discardedDraftIds: string[];
  publishedDrafts: any[];
  customDrafts?: any[];
  lastAutoRunDate?: string | null;
  lastAutoRunAt?: string | null;
}

const CF_WORKER_URL = 'https://dvsynckv.dvanalytics-dev.workers.dev/';
const STORAGE_KEY = 'dv_admin_global_state_v1';

const defaultState: AdminGlobalState = {
  isAutoWriterActive: false,
  scheduledTime: '13:00',
  discardedDraftIds: [],
  publishedDrafts: [],
  customDrafts: [],
  lastAutoRunDate: null,
  lastAutoRunAt: null,
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
  // 1. Fetch from Cloudflare Worker KV Endpoint
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
          customDrafts: Array.isArray(remoteState.customDrafts) ? remoteState.customDrafts : [],
          lastAutoRunDate: typeof remoteState.lastAutoRunDate === 'string' ? remoteState.lastAutoRunDate : null,
          lastAutoRunAt: typeof remoteState.lastAutoRunAt === 'string' ? remoteState.lastAutoRunAt : null,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedState));
        return mergedState;
      }
    }
  } catch (err) {
    // Ignore worker network errors
  }

  // 2. Fallback to LocalStorage
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

  // Sync to Cloudflare Worker
  try {
    const response = await fetch(CF_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
    return response.ok;
  } catch (err) {
    return false;
  }
}
