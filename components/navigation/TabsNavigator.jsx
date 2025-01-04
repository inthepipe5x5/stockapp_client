import { Tabs } from "expo-router";
import { useUserSession } from "@/contexts/userSessionProvider";

const TopLevelNavigator = () => {
  const { state } = useUserSession();

  // Define different tab configurations for auth and non-auth users
  const authenticatedTabs = (
    <Tabs>
      <Tabs.Screen name="home" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="search" options={{ tabBarLabel: "Search" }} />
      <Tabs.Screen name="(dashboard)/index" options={{ tabBarLabel: "Dashboard" }} />
      <Tabs.Screen name="(scan)/index" options={{ tabBarLabel: "Scan" }} />
      <Tabs.Screen name="(profile)/index" options={{ tabBarLabel: "Profile" }} />
      <Tabs.Screen name="+not-found" options={{ tabBarLabel: "404" }} />
    </Tabs>
  );

  const nonAuthenticatedTabs = (
    <Tabs>
      <Tabs.Screen
        name="(auth)/index"
        options={{ tabBarLabel: "Features" }} // Landing Page
      />
      <Tabs.Screen
        name="(auth)/signin"
        options={{ tabBarLabel: "Sign In", headerShown: false }}
      />
      <Tabs.Screen
        name="(auth)/signup"
        options={{ tabBarLabel: "Sign Up", headerShown: false }}
      />
      <Tabs.Screen
        name="(auth)/forgot-password"
        options={{ tabBarLabel: "Forgot Password", headerShown: false }}
      />
    </Tabs>
  );

  // Render tabs based on authentication state
  return state.user ? authenticatedTabs : nonAuthenticatedTabs;
};

export default TopLevelNavigator;
