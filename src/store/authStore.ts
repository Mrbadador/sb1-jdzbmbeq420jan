import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: any | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkPoints: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,
      signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        
        if (error) throw error;
        set({ user: data.user, session: data.session });
      },
      signUp: async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        
        if (error) throw error;
        set({ user: data.user, session: data.session });
      },
      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
      },
      checkPoints: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const lastLogin = new Date(profile.last_login_points_date);
            const now = new Date();
            const hoursDiff = Math.abs(now.getTime() - lastLogin.getTime()) / 36e5;

            if (hoursDiff >= 24) {
              await supabase
                .from('profiles')
                .update({
                  points: profile.points + 5,
                  last_login_points_date: now.toISOString()
                })
                .eq('id', session.user.id);

              await supabase
                .from('points_transactions')
                .insert({
                  user_id: session.user.id,
                  points: 5,
                  transaction_type: 'login',
                  description: '24-hour login bonus'
                });
            }
          }
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);