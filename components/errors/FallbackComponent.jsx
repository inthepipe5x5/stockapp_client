import React from "react";
import { Center, VStack, Heading, Button, Text } from "@gluestack-ui/themed";
import { useTheme } from "@gluestack-ui/themed";

const defaultError = new Error();
defaultError.message = "Oops, something went wrong!";
defaultError.statusCode = 500;

const FallbackComponent = ({ error = defaultError, retry }) => {
  const { theme } = useTheme();
  return (
    <Center className={`flex-1 px-4 ${theme.background[100]}`}>
      <VStack className={`space-y-4 items-center`}>
        <Heading className={`text-xl ${theme.colors.primary}`}>
          {error.message}
        </Heading>
        (
        {error.stack && (
          <Text className={`${theme.colors.muted}`}>{error.stack}</Text>
        )}
        )
        <Button
          className={`${theme.colors.primary} ${theme.colors.text}`}
          onPress={retry}
        >
          Try Again
        </Button>
      </VStack>
    </Center>
  );
};

export default FallbackComponent;
