import { createClient } from '@supabase/supabase-js';
import type { Database } from '../lib/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    emailRedirectTo: `${window.location.origin}/auth/callback`,
    onAuthStateChange: (event: string, session: any) => {
      if (event === 'SIGNED_IN') {
        // Check if email is verified
        const emailVerified = session?.user?.email_confirmed_at != null;
        if (!emailVerified) {
          // Redirect to verification page or show verification message
          window.location.href = '/auth?verify=true';
        }
      }
    }
  },
  global: {
    headers: {
      'x-application-name': 'jmefit',
      'x-application-version': '1.0.0'
    }
  }
});

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];