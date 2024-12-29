import "../env.js"; // Load environment variables
import React from "react";
import RootLayout from "./_layout";
import { Box, Text } from "@gluestack-ui/themed";
import { useUserSession } from "@/contexts/userSessionProvider";
import { useRouter } from "expo-router";

//root page
const RootPage = () => {
  const { router } = useRouter();
  //get user state
  const { state } = useUserSession();

  //reroute to /features if no user is logged in
  return !state || !state.user || state?.user === null ? (
    <Box>
      <Text>RootPage</Text>
    </Box>
  ) : (
    () => {
      router.push("/features");
    }
  );
};

export default RootPage;
