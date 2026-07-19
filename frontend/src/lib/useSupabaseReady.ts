import { useEffect, useState } from 'react';
import { supabase } from './supabase';

/** True once Supabase has a signed-in user (see supabase.ts's anonymous sign-in). */
export function useSupabaseReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    // Covers the case where a session already exists (e.g. page refresh)
    // before the auth-state listener below fires anything.
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setReady(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return ready;
}
