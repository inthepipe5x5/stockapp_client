import React from "react";
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

const StackNavigator = () => {
  return (
    <Stack>
      <Stack.Screen //root home route
        name="/"
        options={{
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
          sidebar: (props) =>
            Platform.OS === "web" ? <Sidebar {...props} /> : null,
        }}
      />
      <Stack.Screen //parallax scroll anon user landing page
        name="/features"
        options={{
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
          sidebar: (props) =>
            Platform.OS === "web" ? <Sidebar {...props} /> : null,
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="(scan)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default StackNavigator;
