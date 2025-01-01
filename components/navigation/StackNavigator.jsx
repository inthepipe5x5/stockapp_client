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
    props.showHeader ? (
      Platform.OS === "web" ? (
        <WebHeader {...props} />
      ) : (
        <MobileHeader {...props} />
      )
    ) : null,
  footer: (props) =>
    props.showFooter ? (
      Platform.OS === "web" ? (
        <WebFooter {...props} />
      ) : (
        <MobileFooter {...props} />
      )
    ) : null,
  sidebar: (props) =>
    Platform.OS === "web" || props.showSidebar ? <Sidebar {...props} /> : null, //show side if web browser or indicated in the route
};
const defaultRouteProps = {
  ...dynamicElements,
  showHeader: true,
  showFooter: true,
  showSidebar: false,
};


//render only the footer icons
//eg. for (auth) routes
const footerOnly = {
  ...dynamicElements,
  showHeader: true,
  showFooter: false,
  showSidebar: false,
}

const StackNavigator = () => {
  return (
    <Stack>
      <Stack.Screen // root home route
        name="index"
        options={defaultRouteProps}
      />
      <Stack.Screen // parallax scroll anon user landing page
        name="features"
        options={defaultRouteProps}
      />
      <Stack.Screen name="(auth)/index" options={footerOnly} />
      <Stack.Screen name="(auth)/signin" options={footerOnly} />
      <Stack.Screen name="(auth)/signup" options={footerOnly} />
      <Stack.Screen name="(dashboard)/index" options={defaultRouteProps} />
      <Stack.Screen name="(scan)/index" options={defaultRouteProps} />
      <Stack.Screen name="(profile)/index" options={defaultRouteProps} />
      <Stack.Screen name="+not-found" options={defaultRouteProps} />
    </Stack>
  );
};

export default StackNavigator;
