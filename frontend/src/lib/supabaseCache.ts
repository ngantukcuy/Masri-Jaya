import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { supabase } from './supabase';

const TABLE = 'tokku_state';

type StateRow<T> = { key: string; value: T };

/**
 * Lightweight Supabase-backed cache for code that isn't a React component
 * (plain utility modules, event handlers) and needs synchronous-looking
 * get/set, similar to how localStorage.getItem/setItem used to work.
 *
 * A background Realtime subscription keeps the in-memory cache fresh; reads
 * return whatever's currently cached (instantly available after the first
 * row arrives, which happens shortly after app load). Writes update the
 * cache immediately and push to Supabase in the background.
 */
const caches = new Map<string, unknown>();
const subscribed = new Set<string>();

function ensureSubscribed<T>(key: string, defaultValue: T) {
  if (subscribed.has(key)) return;
  subscribed.add(key);
  caches.set(key, defaultValue);

  supabase
    .channel(`tokku_state_cache:${key}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: TABLE, filter: `key=eq.${key}` },
      (payload: RealtimePostgresChangesPayload<StateRow<T>>) => {
        if (payload.eventType === 'DELETE') return;
        const row = payload.new as StateRow<T>;
        caches.set(key, row.value);
      }
    )
    .subscribe();

  supabase
    .from(TABLE)
    .select('value')
    .eq('key', key)
    .maybeSingle()
    .then(({ data, error }) => {
      if (error) {
        console.error(`[supabase-cache] Gagal memuat "${key}":`, error);
        return;
      }
      if (data) caches.set(key, data.value);
    });
}

export function getSupabaseCache<T>(key: string, defaultValue: T): T {
  ensureSubscribed(key, defaultValue);
  return caches.has(key) ? (caches.get(key) as T) : defaultValue;
}

export function setSupabaseCache<T>(key: string, value: T): void {
  caches.set(key, value);
  subscribed.add(key);
  supabase
    .from(TABLE)
    .upsert({ key, value: value as never }, { onConflict: 'key' })
    .then(({ error }) => {
      if (error) console.error(`[supabase-cache] Gagal menyimpan "${key}":`, error);
    });
}
