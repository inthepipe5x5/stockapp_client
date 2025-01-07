// import "../env"
import { AppState, Platform } from "react-native";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
// import { configDotenv } from "dotenv";

const createCustomStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage;
  }
  // Server-side storage implementation
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "SUPABASE_URL";
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "SUPABASE_ANON_KEY";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `Missing Supabase URL or Anon Key, ${{
      url: supabaseUrl,
      key: supabaseAnonKey,
    }}`
  );
}
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === "web" ? createCustomStorage() : SecureStore,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Prevents Supabase from evaluating window.location.href, breaking mobile
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.

// COMMENTED OUT BECAUSE THIS LOGIC IS IN ./contexts/userSessionProvider.jsx as a useEffect
// AppState.addEventListener("change", (state) => {
//   if (state === "active") {
//     supabase.auth.startAutoRefresh();
//   } else {
//     supabase.auth.stopAutoRefresh();
//   }
// });

export default supabase;
