import "@/global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@gluestack-ui/themed";

import StackNavigator from "../components/navigation/StackNavigator.jsx";
import ErrorWrapper from "../components/errors/ErrorWrapper.jsx";
import { globalErrorHandler } from "../lib/globalErrorHandler.js";
import FallbackComponent from "../components/errors/FallbackComponent.jsx";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { theme } = useTheme();
  console.log(theme)
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // const WrappedApp = ErrorWrapper(
  //   () => (
  //     <GluestackUIProvider mode={theme.colors.mode}>
  //       <StackNavigator />
  //       <StatusBar style="auto" />
  //     </GluestackUIProvider>
  //   ),
  //   FallbackComponent,
  //   globalErrorHandler
  // );

  // return <WrappedApp />;

  return (
    <GluestackUIProvider mode={theme?.colors?.mode ?? "light"}>
      <StackNavigator />
      <StatusBar style="auto" />
    </GluestackUIProvider>
  )
}
