import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabase";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

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
  preferences: null,
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
const actionTypes = Object.freeze({
  //freeze the object to prevent changes
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  SET_SESSION: "SET_SESSION",
  SET_PREFERENCES: "SET_PREFERENCES",
  SET_DRAFTS: "SET_DRAFTS",
  LOGOUT: "LOGOUT",
});

/** ---------------------------
 *       Reducer Function
 *  ---------------------------
 *  Defines how each action updates
 *  the global state.
 */
function sessionReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };

    case actionTypes.SET_TOKEN:
      return { ...state, token: action.payload };

    case actionTypes.SET_SESSION:
      return { ...state, session: action.payload };

    case actionTypes.SET_PREFERENCES:
      return { ...state, preferences: action.payload };

    case actionTypes.SET_DRAFTS:
      return { ...state, drafts: action.payload };

    case actionTypes.LOGOUT:
      return { ...defaultSession };

    default:
      return state;
  }
}

/** ---------------------------
 *   Create React Context
 *  ---------------------------
 */
const UserSessionContext = createContext({
  state: defaultSession,
  dispatch: () => {},
});

/** ---------------------------
 *  Helper: Storing the session
 *  ---------------------------
 */
async function storeUserSession(sessionObj) {
  // For convenience, you can store the entire session rather than just the token
  await AsyncStorage.setItem(`${appName}_session`, JSON.stringify(sessionObj));
}

/** ---------------------------
 *   HELPER: Initialize Auth
 *  ---------------------------
 *  Restores user session from
 *  AsyncStorage if available.
 */
async function initializeAuth(dispatch) {
  try {
    const storedSession = await AsyncStorage.getItem(`${appName}_session`);
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      // e.g. set session, user, etc
      dispatch({ type: actionTypes.SET_USER, payload: parsedSession.user });
      dispatch({ type: actionTypes.SET_TOKEN, payload: parsedSession.token });
      dispatch({
        type: actionTypes.SET_PREFERENCES,
        payload: parsedSession.preferences,
      });
      dispatch({
        type: actionTypes.SET_SESSION,
        payload: parsedSession.session,
      });
    } else {
      // If no session is found, direct user to login
      router.push("/login");
    }
  } catch (error) {
    console.error("Error initializing auth:", error);
    router.push("/login");
  }
}

/** ---------------------------
 *  Sign In Logic (v1 or v2)
 *  ---------------------------
 *  Adjust for your version of
 *  Supabase auth methods.
 */
const signIn = async ({ email, password }, dispatch) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error logging in user:", error);
      return router.push("/login");
    }

    // If sign-in succeeds, store session
    // 'data.session' includes access_token, user, etc
    if (data.session) {
      await storeUserSession({
        token: data.session.access_token,
        user: data.session.user,
        preferences: data.session.user?.preferences ?? defaultUserPreferences,
        session: data.session,
      });

      // Dispatch local state updates
      dispatch({ type: actionTypes.SET_USER, payload: data.session.user });
      dispatch({
        type: actionTypes.SET_TOKEN,
        payload: data.session.access_token,
      });
      dispatch({
        type: actionTypes.SET_PREFERENCES,
        payload: data.session.user?.preferences ?? defaultUserPreferences,
      });
      dispatch({ type: actionTypes.SET_SESSION, payload: data.session });

      router.push("/home");
    }
  } catch (err) {
    console.error("Sign in error:", err);
    router.push("/login");
  }
};

/** ---------------------------
 *  signOut helper
 *  ---------------------------
 */
const signOut = async (dispatch) => {
  try {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem(`${appName}_session`);
    dispatch({ type: actionTypes.LOGOUT });
    router.push("/login");
  } catch (err) {
    console.error("Sign out error:", err);
  }
};

/** ---------------------------
 *  UserSessionProvider
 *  ---------------------------
 */
export const UserSessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialSession());

  // On initial mount, attempt to restore session from AsyncStorage
  useEffect(() => {
    initializeAuth(dispatch);
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED" || event === "SIGNED_IN" || event === "USER_UPDATED" || event === "active") {
        dispatch({ type: "SET_AUTH", payload: session?.user });
      }
      if (event === "SIGNED_OUT") {
        dispatch({ type: "LOGOUT" });
      }
    });
  }, []);

  // Callback versions for stable function references
  const handleSignIn = useCallback((userCredentials) => {
    signIn(userCredentials, dispatch);
  }, []);

  const handleSignOut = useCallback(() => {
    signOut(dispatch);
  }, []);

  const handleSetResource = useCallback((resource) => {
    setResource(dispatch, resource);
  }, []);

  return (
    <UserSessionContext.Provider
      value={{
        state,
        dispatch,
        signIn: handleSignIn,
        signOut: handleSignOut,
        setResource: handleSetResource,
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
