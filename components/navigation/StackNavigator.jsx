import React, { useEffect } from "react";
import { Stack, Tabs } from "expo-router";
import WebFooter from "../WebFooter";
import WebHeader from "../WebHeader";
import MobileFooter from "../MobileFooter";
import Sidebar from "../Sidebar";
import { Platform } from "react-native";
import MobileHeader from "../MobileHeader";
import { useBreakpointValue } from "../ui/utils/use-break-point-value";

/**
 * Stack Navigator for the app's routes.
 */

const Header = Platform.select({
  web: WebHeader,
  default: MobileHeader,
});

const Footer = Platform.select({
  web: WebFooter,
  default: MobileFooter,
});

//render sidebar only on larger than sm breakpoints
const RenderSideBar = useBreakpointValue({
  default: true,
  sm: false,
});

const dynamicElements = {
  header: (props) =>
    Platform.OS === "web" && props.showHeader ? <Header {...props} /> : null,
  footer: (props) => (props.showFooter ? <Footer {...props} /> : null),
  sidebar: (props) =>
    (Platform.OS === "web" && RenderSideBar) || props.showSidebar ? (
      <Sidebar {...props} />
    ) : null,
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
};

// const StackNavigator = () => {
//   return (
//     <Stack>
//       <Stack.Screen // root home route
//         name="index"
//         options={defaultRouteProps}
//       />
//       <Stack.Screen // parallax scroll anon user landing page
//         name="features"
//         options={defaultRouteProps}
//       />
//       <Stack.Screen name="(auth)/index" options={footerOnly} />
//       <Stack.Screen name="(auth)/signin" options={footerOnly} />
//       <Stack.Screen name="(auth)/signup" options={footerOnly} />
//       <Stack.Screen name="(dashboard)/index" options={defaultRouteProps} />
//       <Stack.Screen name="(scan)/index" options={defaultRouteProps} />
//       <Stack.Screen name="(profile)/index" options={defaultRouteProps} />
//       <Stack.Screen name="+not-found" options={defaultRouteProps} />
//     </Stack>
//   );
// };




//within each 
const StackNavigator = () => {
  return (
    <Stack>
      <Stack.Screen name="(ParentResourceOverview)"></Stack.Screen> {/*/ root home route*/}
      <Stack.Screen name="(ParentResource)"></Stack.Screen> {/*/ root home route*/}
      <Stack.Screen name="(ResouceDetails)"></Stack.Screen>
      <Stack.Screen name="(ChildrenOverview)"></Stack.Screen> {/*/ root home route*/}
      <Stack.Screen name="(ChildResource)"></Stack.Screen> {/*/ root home route*/}
      <Stack.Screen name="(ResouceDetails)"></Stack.Screen>
    </Stack>
  );
};

export default StackNavigator;
