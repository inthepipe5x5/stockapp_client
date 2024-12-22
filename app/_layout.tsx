import "../global.css";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import StackNavigator from "@/navigation/StackNavigator";
import ErrorWrapper from "@/components/errors/ErrorWrapper.jsx";
import { globalErrorHandler } from "../lib/globalErrorHandler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const WrappedApp = ErrorWrapper(
    () => (
      <GluestackUIProvider>
        <StackNavigator />
        <StatusBar style="auto" />
      </GluestackUIProvider>
    ),
    undefined,
    globalErrorHandler
  );

  return <WrappedApp />;
}
