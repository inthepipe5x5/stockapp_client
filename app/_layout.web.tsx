import "@/global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "@gluestack-ui/themed";
import { UserSessionProvider } from "../contexts/userSessionProvider";
import { ThemeProvider } from "../contexts/ThemeContext";
import TopLevelNavigator from "../components/navigation/TopLevelNavigator.jsx";
import { StatusBar } from "expo-status-bar";
import { Router } from "expo-router";
export default function RootLayoutWeb() {
  const queryClient = new QueryClient();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { theme } = useTheme();

  useEffect(() => {
    if (loaded) {
      console.log("Fonts loaded for the web.");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserSessionProvider>
          <GluestackUIProvider mode={theme?.colors?.mode ?? "light"}>
            <Router>
              <TopLevelNavigator />
            </Router>
            <StatusBar style="auto" />
          </GluestackUIProvider>
        </UserSessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
