import React from "react";
import { Tabs, Stack } from "expo-router";
import { useUserSession } from "@/contexts/userSessionProvider";

const TopLevelNavigator = () => {
  const { state } = useUserSession();

  // Define different tab configurations for auth and non-auth users
  const authenticatedTabs = (
    <Tabs>
      <Tabs.Screen name="(tabs)/home" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen
        name="(tabs)/(dashboard)/index"
        options={{ tabBarLabel: "Dashboard" }}
      />
      <Tabs.Screen
        name="(tabs)/(search)/index"
        options={{ tabBarLabel: "Search" }}
      />
      <Tabs.Screen
        name="(tabs)/(profile)/index"
        options={{ tabBarLabel: "Profile" }}
      />
      <Tabs.Screen
        name="+not-found"
        options={{ tabBarLabel: "Error: Page Not Found" }}
      />
    </Tabs>
  );

  const unauthenticatedTabs = (
    <Tabs>
      <Tabs.Screen name="features" options={{ tabBarLabel: "Features" }} />
      <Tabs.Screen name="(auth)/index" options={{ tabBarLabel: "Sign In" }} />
      <Tabs.Screen name="(auth)/signup" options={{ tabBarLabel: "Sign Up" }} />
      <Tabs.Screen name="(auth)/scan" options={{ tabBarLabel: "Scan" }} />
    </Tabs>
  );

  // Render tabs based on authentication state
  return state.user ? authenticatedTabs : unauthenticatedTabs;
};

export default TopLevelNavigator;
