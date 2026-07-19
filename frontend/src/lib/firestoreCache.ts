import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Lightweight Firestore-backed cache for code that isn't a React component
 * (plain utility modules, event handlers) and needs synchronous-looking
 * get/set, similar to how localStorage.getItem/setItem used to work.
 *
 * A background `onSnapshot` listener keeps the in-memory cache fresh; reads
 * return whatever's currently cached (instantly available after the first
 * snapshot arrives, which happens shortly after app load). Writes update the
 * cache immediately and push to Firestore in the background.
 */
const caches = new Map<string, unknown>();
const subscribed = new Set<string>();

function ensureSubscribed<T>(key: string, defaultValue: T) {
  if (subscribed.has(key)) return;
  subscribed.add(key);
  caches.set(key, defaultValue);
  const ref = doc(db, 'tokku', key);
  onSnapshot(
    ref,
    (snap) => {
      if (snap.exists()) {
        caches.set(key, snap.data().value);
      }
    },
    (err) => console.error(`[firestore-cache] Gagal sinkronisasi "${key}":`, err)
  );
}

export function getFirestoreCache<T>(key: string, defaultValue: T): T {
  ensureSubscribed(key, defaultValue);
  return caches.has(key) ? (caches.get(key) as T) : defaultValue;
}

export function setFirestoreCache<T>(key: string, value: T): void {
  caches.set(key, value);
  subscribed.add(key);
  const ref = doc(db, 'tokku', key);
  setDoc(ref, { value }).catch((err) =>
    console.error(`[firestore-cache] Gagal menyimpan "${key}":`, err)
  );
}
