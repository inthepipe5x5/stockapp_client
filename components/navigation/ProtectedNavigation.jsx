import React, { useEffect } from "react";
import { Redirect, SplashScreen } from "expo-router";
import { useUserSession } from "../../contexts/userSessionProvider";

const ProtectedNavigation = (WrappedComponent) => {
  return (props) => {
    const { state } = useUserSession();

    useEffect(() => {
      SplashScreen.preventAutoHideAsync();
      if (state.user !== null) {
        SplashScreen.hideAsync();
      }
    }, [state.user]);

    if (!state || !state === null || !state.user || state.user === null) {
      return <Redirect replace to="/(auth)/index" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedNavigation;