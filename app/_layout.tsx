import "../global.css";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { config } from "@/components/ui/gluestack-ui-provider/config";
import FallBackComponent from "../components/errors/FallBackComponent.jsx";
import {
  globalErrorHandler,
  globalNativeErrorHandler,
  createGlobalErrorHandler,
  createGlobalNativeErrorHandler,
} from "../lib/globalErrorHandler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Set up global error handlers for native and JavaScript exceptions
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";

setJSExceptionHandler((error: any, isFatal: any) => {
  globalErrorHandler(error, isFatal);
}, true);

setNativeExceptionHandler((errorString: any) => {
  globalNativeErrorHandler(errorString);
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Reset error state function
  const resetError = (errorState = false, errorDetails = null) => {
    setHasError(errorState);
    setErrorDetails(errorDetails);
  };

  // Handle JavaScript exceptions for rendering-level errors
  const handleComponentError = (error: any) => {
    console.error("Rendering error caught:", error);
    setHasError(true);
    setErrorDetails(error);
  };

  try {
    if (!loaded) {
      return null;
    }

    if (hasError) {
      return <FallBackComponent error={errorDetails} retry={resetError} />;
    }

    return (
      // @ts-ignore
      <GluestackUIProvider config={config}>
        <Stack>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="(dashboard)" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="(scan)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GluestackUIProvider>
    );
  } catch (error) {
    // Catch any rendering errors and handle them
    handleComponentError(error);
    return <FallBackComponent error={error} retry={resetError} />;
  }
}
