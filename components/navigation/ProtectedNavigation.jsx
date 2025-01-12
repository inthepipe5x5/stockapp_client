import React, { useEffect } from "react";
import { Redirect, SplashScreen } from "expo-router";
import { useUserSession } from "../../contexts/userSessionProvider";

const ProtectedNavigation = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated } = useUserSession();

    useEffect(() => {
      SplashScreen.preventAutoHideAsync();
      if (isAuthenticated && state !== null) {
        SplashScreen.hideAsync();
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return <Redirect replace to="/(auth)/index" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedNavigation;
