import "@/global.css";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
// import { useTheme } from "@gluestack-ui/themed";
import { useUserSession } from "../contexts/userSessionProvider";
import TopLevelNavigator from "../components/navigation/TopLevelNavigator";
import { UserSessionProvider } from "../contexts/userSessionProvider";
import { ThemeProvider, useThemeContext } from "../contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const { theme } = useThemeContext();
  const queryClient = new QueryClient();

  // Load custom fonts
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserSessionProvider>
          <GluestackUIProvider mode={"system"}>
            <TopLevelNavigator />
            <StatusBar style="auto" />
          </GluestackUIProvider>
        </UserSessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
