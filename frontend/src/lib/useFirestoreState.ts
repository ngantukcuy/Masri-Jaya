import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Drop-in replacement for `useState<T>(initialValue)` that persists the
 * value to a single Firestore document and keeps every open tab/device in
 * sync in real time.
 *
 * Design choice: each "table" (products, customers, sales invoices, ...)
 * is stored as ONE document with the whole list in a `value` field, instead
 * of one Firestore document per item. This keeps the migration a near
 * 1-for-1 swap of `useState` calls in App.tsx (no need to rewrite every
 * onUpdateX callback to do per-item Firestore writes), which matters more
 * for an app this size than the write-granularity you'd want at bigger
 * scale. If this app ever needs many concurrent cashiers hammering the
 * same collection, migrating hot collections (e.g. `products`) to one
 * document per item is the natural next step.
 *
 * Usage is identical to useState:
 *   const [products, setProducts] = useFirestoreState('products', initialProducts);
 */
export function useFirestoreState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValueState] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);
  // Avoids re-writing to Firestore the instant we receive our own update back.
  const latestLocalWrite = useRef<T | null>(null);

  useEffect(() => {
    const ref = doc(db, 'tokku', key);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setValueState(snap.data().value as T);
        } else {
          // First run for this collection: seed Firestore with the mock data
          // so the app has something to show and future reloads persist.
          setDoc(ref, { value: initialValue }).catch((err) =>
            console.error(`[firestore] Gagal seed data awal untuk "${key}":`, err)
          );
        }
        setReady(true);
      },
      (err) => {
        console.error(`[firestore] Gagal sinkronisasi "${key}":`, err);
        setReady(true);
      }
    );
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = (next: T | ((prev: T) => T)) => {
    setValueState((prev) => {
      const resolved = typeof next === 'function' ? (next as (prev: T) => T)(prev) : next;
      latestLocalWrite.current = resolved;
      const ref = doc(db, 'tokku', key);
      setDoc(ref, { value: resolved }).catch((err) =>
        console.error(`[firestore] Gagal menyimpan "${key}":`, err)
      );
      return resolved;
    });
  };

  void ready; // exposed via useFirestoreState if a loading state is ever needed

  return [value, setValue];
}
