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
  const { state } = useUserSession();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (state && state.user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [state]);

  return (
    <Tabs>
      <Tabs.Screen
        replace={() => {
          auth ? <Redirect to="/(auth))" /> : null;
        }}
        name="home"
        options={{ tabBarLabel: "Home" }}
      />
      <Tabs.Screen
        replace={() => {
          auth ? <Redirect to="/(auth))" /> : null;
        }}
        name="(dashboard)/index"
        options={{ tabBarLabel: "Dashboard" }}
      />
      <Tabs.Screen
        replace={() => {
          auth ? <Redirect to="/(auth))" /> : null;
        }}
        name="(search)/index"
        options={{ tabBarLabel: "Search" }}
      />
      <Tabs.Screen
        replace={() => {
          auth ? <Redirect to="/(auth))" /> : null;
        }}
        name="(profile)/index"
        options={{ tabBarLabel: "Profile" }}
      />
      <Tabs.Screen
        replace={() => {
          auth ? <Redirect to="/(auth))" /> : null;
        }}
        name="/(inbox)"
      />
      <Tabs.Screen
        name="(stacks)"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default ProtectedNavigation(RootTabLayout);
