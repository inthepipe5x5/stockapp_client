import { Tabs } from "expo-router";
import { AuthLayout } from "../../screens/auth/layout";

/**
 * AuthStack component renders the stack of authentication-related screens.
 *
 * This component uses a Tabs navigator to manage the navigation between
 * different authentication screens such as index, signin, signup, and
 * forgot-password.
 *
 * @returns {JSX.Element} The stack navigator with authentication screens.
 */
const AuthStack = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="signin" />
      <Tabs.Screen name="signup" />
      <Tabs.Screen name="forgot-password" />
    </Tabs>
  );
};

export default function AuthStackLayout() {
  return <AuthLayout props={AuthStack} />;
}
a;
