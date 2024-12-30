import "../env.js"; // Load environment variables
import React from "react";
import RootLayout from "./_layout";
import { Box, Text } from "@gluestack-ui/themed";
import { useUserSession } from "@/contexts/userSessionProvider";
import { useRouter } from "expo-router";
import { Link, Center, VStack } from "@gluestack-ui/themed";
import { Button, ButtonIcon, ButtonGroup } from "@gluestack-ui/button";
import { Link as LinkIcon } from "lucide-react-native";

//root page
const RootPage = () => {
  const { router } = useRouter();
  //get user state
  const { state } = useUserSession();

  //reroute to /features if no user is logged in
  return !state || !state.user || state?.user === null ? (
    <Center>
      <VStack className="gap-1">
        <Text>RootPage</Text>
        <Button
          className="primary"
          variant="outline"
          onPress={() => router.push("/(auth)/")}
        >
          <ButtonIcon as={LinkIcon} />
        </Button>
      </VStack>
    </Center>
  ) : (
    () => {
      router.push("/features");
    }
  );
};

export default RootPage;
