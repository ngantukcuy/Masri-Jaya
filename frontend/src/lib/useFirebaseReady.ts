import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

/** True once Firebase has a signed-in user (see firebase.ts's anonymous sign-in). */
export function useFirebaseReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setReady(true);
    });
    return () => unsubscribe();
  }, []);

  return ready;
}
