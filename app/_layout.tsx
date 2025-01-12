import "@/global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@gluestack-ui/themed";

import TopLevelNavigator from "../components/navigation/TopLevelNavigator";
import { UserSessionProvider } from "../contexts/userSessionProvider";
import { ThemeProvider } from "../contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();

  // Load custom fonts
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { theme } = useTheme();

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
          <GluestackUIProvider mode={theme?.colors?.mode ?? "system"}>
            <NavigationContainer>
              <TopLevelNavigator />
            </NavigationContainer>
            <StatusBar style="auto" />
          </GluestackUIProvider>
        </UserSessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
