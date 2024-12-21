import React from "react";
import { Stack } from "expo-router";

/**
 * Stack Navigator for the app's routes.
 */
const StackNavigator = () => {
  return (
    <Stack>
      {/* Example Routes */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="(scan)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default StackNavigator;
