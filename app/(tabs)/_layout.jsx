import { Tabs } from "expo-router";
import ProtectedNavigation from "../../components/navigation/ProtectedNavigation";
/**
 * Root Tabs Navigator for authenticated users.
 *
 * Manages the top-level navigation between sections like Home, Dashboard, Search, and Profile.
 */
function RootTabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen
        name="(dashboard)/index"
        options={{ tabBarLabel: "Dashboard" }}
      />
      <Tabs.Screen name="(search)/index" options={{ tabBarLabel: "Search" }} />
      <Tabs.Screen
        name="(profile)/index"
        options={{ tabBarLabel: "Profile" }}
      />
    </Tabs>
  );
}

export default ProtectedNavigation(RootTabLayout);
