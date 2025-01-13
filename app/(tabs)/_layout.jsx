import { Redirect, Tabs } from "expo-router";
import ProtectedNavigation from "@/components/navigation/ProtectedNavigation";
import { useUserSession } from "@/contexts/userSessionProvider";
import { use, useEffect } from "react";
/**
 * Root Tabs Navigator for authenticated users.
 *
 * Manages the top-level navigation between sections like Home, Dashboard, Search, and Profile.
 */
function RootTabLayout() {
  const { state, isAuthenticated } = useUserSession();
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    setAuth(isAuthenticated());
  }, [isAuthenticated, state]);

  return (
    <Tabs>
      <Tabs.Screen
        name="(stacks)"
        replace={() => {
          auth ? <Redirect to="/(tabs)" /> : null;
        }}
        options={{
          // presentation: "modal",
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        replace={() => {
          auth ? <Redirect to="/(auth)" /> : null;
        }}
        name="home"
        options={{ tabBarLabel: "Home" }}
      />
      <Tabs.Screen
        replace={() => {
          auth ? <Redirect to="/(auth)" /> : null;
        }}
        name="(dashboard)/index"
        options={{ tabBarLabel: "Dashboard" }}
      />
      <Tabs.Screen
        replace={() => {
          auth ? <Redirect to="/(auth)" /> : null;
        }}
        name="(search)/index"
        options={{ tabBarLabel: "Search" }}
      />
      <Tabs.Screen
        replace={() => {
          auth ? <Redirect to="/(auth)" /> : null;
        }}
        name="(profile)/index"
        options={{ tabBarLabel: "Profile" }}
      />
      <Tabs.Screen
        replace={() => {
          auth ? <Redirect to="/(auth)" /> : null;
        }}
        name="/(inbox)"
      />
      <Tabs.Screen />
    </Tabs>
  );
}

export default ProtectedNavigation(RootTabLayout);
