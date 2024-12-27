import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

import supabase from "@/lib/supabase";
import defaultUserPreferences from "../constants/userPreferences";

const appName = "stock_app"; // TODO: possibly change this to dynamically get the app name

/** ---------------------------
 *        Default Session
 *  ---------------------------
 *  Everything related to the user’s
 *  session, preferences, and other
 *  global state can go here.
 */
const defaultSession = {
  user: null,
  preferences: defaultUserPreferences,
  token: null,
  session: null,
  drafts: [],
  // households: [],
  // inventories: [],
  // tasks: [],
};
//dynamic user setting via checking async storage
const initialSession = async () => {
  try {
    // Try to get session from SecureStore first
    const storedSession = await SecureStore.getItemAsync(`${appName}_session`);

    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);

      // Set the session in Supabase client
      supabase.auth.setSession({
        access_token: parsedSession.token,
        refresh_token: parsedSession.refreshToken,
      });

      return parsedSession;
    }

    // If no stored session, check with Supabase
    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session) {
      return defaultSession;
    }

    // Store the new session securely via access_token to the SecureStore
    await SecureStore.setItemAsync(
      `${appName}_session`,
      JSON.stringify({
        token: data.session.access_token,
      })
    );

    return data.session;
  } catch (error) {
    console.error("Error initializing session:", error);
    return defaultSession;
  }
};
/** ---------------------------
 *        Action Types
 *  ---------------------------
 *  Enumerated action types
 *  for maintainability.
 */
// Action Types
const actionTypes = Object.freeze({
  SET_SESSION: "SET_SESSION",
  SET_USER: "SET_USER", // set the user when sign in or sign up or user switch
  SET_PREFERENCES: "SET_PREFERENCES",
  LOGOUT: "LOGOUT",
});

/** ---------------------------
 *       Reducer Function
 *  ---------------------------
 * Reducer function to manage the user session state.
 *
 * @param {Object} state - The current state of the session.
 * @param {Object} action - The action object to determine the state change.
 * @param {string} action.type - The type of action to be performed.
 * @param {Object} [action.payload] - The payload containing data for the action.
 * @returns {Object} The new state after applying the action.
 */

const sessionReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SESSION:
      return {
        ...state,
        session: action.payload,
        user: action.payload?.user || null,
        token: action.payload?.access_token || null,
        preferences:
          action.payload?.user?.preferences ?? defaultUserPreferences,
      };
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    case actionTypes.SET_PREFERENCES:
      return { ...state, preferences: action.payload };
    case actionTypes.LOGOUT:
      return { ...defaultSession };
    default:
      return state;
  }
};

/** ---------------------------
 *  Helper: Storing the session
 *  ---------------------------
*  Stores the user session in the secure store.
*  @param {Object} sessionObj - The session object to store. 
  
* NOTE: storing the entire user session for simplicity.
*/
async function storeUserSession(sessionObj) {
  await AsyncStorage.setItem(`${appName}_session`, JSON.stringify(sessionObj));
}

/** ---------------------------
 *   HELPER: Initialize Auth
 *  ---------------------------
 *  Restores user session from
 *  AsyncStorage if available.
 */
// Fetch and initialize session
const fetchSession = async () => {
  try {
    const storedSession = await SecureStore.getItemAsync(`${appName}_session`);
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      return parsedSession;
    }

    const { data, error } = await supabase.auth.getSession();
    if (error || !data?.session) return defaultSession;

    await storeSession(data.session);
    return data.session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return defaultSession;
  }
};

/** ---------------------------
 *  Sign In Logic (v1 or v2)
 *  ---------------------------
 *  Adjust for your version of
 *  Supabase auth methods.
 */
const signIn = async (
  { email, password, access_token, oauthProvider },
  dispatch
) => {
  try {
    let data, error;

    if (access_token && oauthProvider) {
      // OAuth-based sign-in
      const { data: oauthData, error: oauthError } =
        await supabase.auth.signInWithOAuth({
          provider: oauthProvider,
          access_token,
        });

      data = oauthData;
      error = oauthError;
    } else if (password) {
      // Password-based sign-in
      const { data: passwordData, error: passwordError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      data = passwordData;
      error = passwordError;
    } else {
      throw new Error(
        "Either 'password' or 'access_token' with 'oauthProvider' must be provided"
      );
    }

    if (error) {
      console.error("Sign-in error:", error.message);
      return router.push("/login");
    }

    if (data.session) {
      await storeSession(data.session);

      dispatch({ type: actionTypes.SET_SESSION, payload: data.session });
      router.push("/home");
    }
  } catch (err) {
    console.error("Sign-in error:", err);
    router.push("/login");
  }
};

/** ---------------------------
 *  signOut helper
 *  ---------------------------
 */
async function signOut(dispatch) {
  try {
    await supabase.auth.signOut();
    await SecureStore.deleteItemAsync(`${appName}_session`);
    dispatch({ type: actionTypes.LOGOUT });
    router.push("/login");
  } catch (err) {
    console.error("Sign-out error:", err);
  }
}
/** ---------------------------
 *   Create React Context
 *  ---------------------------
 */
const UserSessionContext = createContext({
  state: defaultSession,
  dispatch: () => {},
  signIn: () => {},
  signOut: () => {},
});

/** ---------------------------
 *  UserSessionProvider
 *  ---------------------------
 */

// Provider Component
export const UserSessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sessionReducer, defaultSession);

  useEffect(() => {
    const initialize = async () => {
      const session = await fetchSession();
      dispatch({ type: actionTypes.SET_SESSION, payload: session });
    };

    initialize();

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (["SIGNED_IN", "TOKEN_REFRESHED", "USER_UPDATED"].includes(event)) {
          dispatch({ type: actionTypes.SET_SESSION, payload: session });
        } else if (event === "SIGNED_OUT") {
          dispatch({ type: actionTypes.LOGOUT });
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const handleSignIn = useCallback((userCredentials) => {
    signIn(userCredentials, dispatch);
  }, []);

  const handleSignOut = useCallback(() => {
    signOut(dispatch);
  }, []);

  return (
    <UserSessionContext.Provider
      value={{
        state,
        dispatch,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

/** ---------------------------
 *  useUserSession Hook
 *  ---------------------------
 */
export function useUserSession() {
  return useContext(UserSessionContext);
}
