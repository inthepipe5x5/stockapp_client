import React from "react";
import { Center } from '@gluestack-ui/themed';
import { VStack } from '@gluestack-ui/vstack';
import { Heading, Button, Text } from '@gluestack-ui/themed';

const FallbackComponent = ({ error, retry }) => {
  return (
    <Center className="flex-1 px-4 bg-background-100"> {/* Tailwind utility classes -> Default background */}
      <VStack className="space-y-4 items-center">
        <Heading className="text-xl text-primary">Oops, something went wrong!</Heading>
        <Text className="text-muted">{error.message}</Text>
        <Button className="bg-primary text-white" onPress={retry}>
          Try Again
        </Button>
      </VStack>
    </Center>
  );
};

export default FallbackComponent;
