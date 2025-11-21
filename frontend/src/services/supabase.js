import { createClient } from '@supabase/supabase-js'

// Read env vars
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

// Hard fail if missing (prevents blank screen errors)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env vars", {
    supabaseUrl,
    supabaseAnonKey
  });
  throw new Error("Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_KEY on Vercel.");
}

// Correct initializer
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const authHelpers = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async getAuthToken() {
    const session = await this.getSession();
    return session?.access_token || null;
  }
};