import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_NATIVE_SUPABASE_URL ?? "SUPABASE URL";
const supabaseAnonKey =
  process.env.REACT_NATIVE_SUPABASE_ANON_KEY ?? "SUPABASE ANON KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, //store this in async storage
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Prevents Supabase from evaluating window.location.href, breaking mobile
  },
});


//helper function that queries supabase DB with react query
import { useQuery } from "react-query";
import { useCallback } from "react";

export const useSupabaseQuery = (table, schema, filters = {}, limit = null) => {
  const fetchData = useCallback(async () => {
    let query = supabase.from(table).select();

    if (Object.keys(filters).length > 0) {
      query = query.match(filters);
    }

    if (limit !== null) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return schema.parse(data);
  }, [table, schema, filters, limit]);

  return useQuery([table, filters, limit], fetchData);
};

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
