import React, { useEffect } from "react";
import { Stack } from "expo-router";
import WebFooter from "../WebFooter";
import WebHeader from "../WebHeader";
import MobileFooter from "../MobileFooter";
import Sidebar from "../Sidebar";
import { Platform } from "react-native";
import MobileHeader from "../MobileHeader";

/**
 * Stack Navigator for the app's routes.
 */

const dynamicElements = {
  header: (props) =>
    Platform.OS === "web" ? (
      <WebHeader {...props} />
    ) : (
      <MobileHeader {...props} />
    ),
  footer: (props) =>
    Platform.OS === "web" ? (
      <WebFooter {...props} />
    ) : (
      <MobileFooter {...props} />
    ),
  sidebar: (props) => (Platform.OS === "web" ? <Sidebar {...props} /> : null),
};

const StackNavigator = () => {
  useEffect(() => {
    console.log("Navigating to:", Platform.OS);
  }, []);

  return (
    <Stack>
      <Stack.Screen // root home route
        name="index"
        options={dynamicElements}
      />
      <Stack.Screen // parallax scroll anon user landing page
        name="features"
        options={dynamicElements}
      />
      <Stack.Screen name="(auth)/index" options={dynamicElements} />
      <Stack.Screen name="(auth)/signin" options={dynamicElements} />
      <Stack.Screen name="(auth)/signup" options={dynamicElements} />
      <Stack.Screen name="(dashboard)/index" options={dynamicElements} />
      <Stack.Screen name="(scan)/index" options={dynamicElements} />
      <Stack.Screen name="(profile)/index" options={dynamicElements} />
      <Stack.Screen name="+not-found" options={dynamicElements} />
    </Stack>
  );
};

export default StackNavigator;
