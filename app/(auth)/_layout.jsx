import { Stack } from "expo-router";
import { Redirect, useRouter } from "expo-router";
import useUserSession from "@/contexts/userSessionProvider";
// import { AuthLayout } from "@/screens/(auth)/layout";

/**
 * AuthStack component renders the stack of authentication-related screens.
 *
 * This component uses a Stack navigator to manage navigation between
 * authentication screens such as index, signin, signup, and forgot-password.
 *
 * @returns {JSX.Element} The stack navigator with authentication screens.
 */
const AuthStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Welcome" }} />
      <Stack.Screen name="signin" options={{ headerTitle: "Sign In" }} />
      <Stack.Screen name="signup" options={{ headerTitle: "Sign Up" }} />
      <Stack.Screen
        name="forgot-password"
        options={{ headerTitle: "Forgot Password" }}
      />
    </Stack>
  );
};

export default AuthStack;

// export default function AuthStackLayout() {
//   return (
//     <AuthLayout>
//       <AuthStack />
//     </AuthLayout>
//   );
// }
