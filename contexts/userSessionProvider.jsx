import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import supabase from "../services/supabase";
import defaultUserPreferences from "../constants/userPreferences";
import { useThemeContext } from "./ThemeContext";
import useSupabaseQuery from "../hooks/useSupabase";
import isExpired from "../utils/isExpired";

const appName = "stock_app";

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
/**
 * The function ensureSessionNotExpired checks if a session is still active.
 * @param {object} sessionData - Supabase session object
 * @example {object} - sessionData{
  "session": {
    "access_token": "your_access_token",
    "expires_at": 1234567890, //time in seconds since Unix Epoch
    "user": {
      "id": "user_id",
      "email": "user_email",
      "created_at": "timestamp",
      "updated_at": "timestamp",
      // other user fields
    }
  }
}
  @returns {boolean} - true if session is fresh; false by default 
 */

const ensureSessionNotExpired = (sessionData) => {
  //guard clauses
  if (!sessionData || sessionData === null) false;
  /**
   * The function `findExpiryDate` recursively searches for and returns the expiry date value from a
   * nested object based on specific key names.
   * @returns The `findExpiryDate` function is designed to search for an expiry date property within a
   * nested object. It returns the value of the first encountered key that matches one of the specified
   * keys related to expiry dates ("expires_at", "expiresAt", "expiry", "expiry_date", "expiryDate").
   * If no matching key is found at any level of nesting, it returns `null`.
   */

  const findExpiryDate = (obj) => {
    if (typeof obj !== "object" || obj === null) return null;

    const keys = [
      "expires_at",
      "expiresAt",
      "expiry",
      "expiry_date",
      "expiryDate",
    ];
    for (const key of keys) {
      if (obj.hasOwnProperty(key)) {
        return obj[key];
      }
    }

    for (const key in obj) {
      if (typeof obj[key] === "object") {
        const result = findExpiryDate(obj[key]);
        if (result !== null) return result;
      }
    }

    return null;
  };

  const expiry = findExpiryDate(sessionData); /*
  !isExpired(expiry) : false;` in the
  `ensureSessionNotExpired` function is checking if the
  `expiry` value is either falsy or `null`. If it is,
  then it returns the result of `!isExpired(expiry)`,
  which implies that the session is not expired. If the
  `expiry` value is not falsy or `null`, then it simply
  returns `false`, indicating that the session is
  expired. */
  return !expiry || expiry === null ? !isExpired(expiry) : false;
};

const fetchProfile = async (user_id) => {
  try {
    const { data, error } = useSupabaseQuery(
      "profiles", //table
      { user_id }, //filters
      1 //limit
    );
    if (!data || data === null || error)
      throw new Error("Error fetching user profile");
    else {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

const actionTypes = Object.freeze({
  SET_SESSION: "SET_SESSION",
  SET_USER: "SET_USER",
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
  await SecureStore.setItemAsync(
    `${appName}_session`,
    JSON.stringify(sessionObj)
  );
}

/** ---------------------------
 *   HELPER: Fetch Session
 *  ---------------------------
 *  Restores user session from
 *  AsyncStorage if available.
 * Fetch and initialize session.
 * Combines fetching session logic and ensures the session is not expired.
 * Fetches user profile if session is valid.
 */
const fetchSession = async () => {
  try {
    // Try to get session from SecureStore
    const storedSession = await SecureStore.getItemAsync(`${appName}_session`);

    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);

      // Check if session is expired
      if (ensureSessionNotExpired(parsedSession)) {
        // Fetch user profile and return the session with user data
        const userProfile = await fetchProfile(parsedSession.user.id);
        return {
          ...parsedSession,
          user: { ...parsedSession.user, profile: userProfile },
        };
      } else {
        console.warn("Stored session expired.");
      }
    }

    // If no stored session or expired, check with Supabase
    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session || !ensureSessionNotExpired(data.session)) {
      console.warn("Supabase session expired or invalid.");
      return defaultSession;
    }

    // Store new session securely
    await SecureStore.setItemAsync(
      `${appName}_session`,
      JSON.stringify({
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
        user: data.session.user,
      })
    );

    // Fetch user profile and return session with user data
    const userProfile = await fetchProfile(data.session.user.id);
    return {
      ...data.session,
      user: { ...data.session.user, profile: userProfile },
    };
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
      await storeUserSession(data.session);
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
  state: initialSession(),
  dispatch: () => {},
  signIn: (credentials) => {}, // accepts credentials for OAuth or password-based login
  signOut: () => {},
});

/** ---------------------------
 *  UserSessionProvider
 *  ---------------------------
 */

// Provider Component
export const UserSessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sessionReducer, defaultSession);
  const { theme, colors, updatePreferences } = useThemeContext();

  useEffect(() => {
    const initialize = async () => {
      const { session, profile } = await fetchSession();
      //set session
      dispatch({ type: actionTypes.SET_SESSION, payload: session });
      //set user
      dispatch({ type: actionTypes.SET_USER, payload: profile });
      //set preferences
      dispatch({
        type: actionTypes.SET_PREFERENCES,
        payload: profile?.preferences ?? defaultUserPreferences,
      });
      if (profile?.preferences) {
        //update themeContext
        updatePreferences(profile.preferences);
      }
    };
    initialize();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (["SIGNED_IN", "TOKEN_REFRESHED", "USER_UPDATED"].includes(event)) {
          dispatch({ type: actionTypes.SET_SESSION, payload: session });
          if (session?.user?.preferences) {
            updatePreferences(session.user.preferences);
          }
        } else if (event === "SIGNED_OUT") {
          dispatch({ type: actionTypes.LOGOUT });
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [updatePreferences]);

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
        theme,
        colors,
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
