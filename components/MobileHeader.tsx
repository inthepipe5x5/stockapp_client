import { Text } from "@gluestack-ui/themed";
import { HStack } from "./ui/hstack";
import HeaderBackButton from "./navigation/HeaderBackButton";

type MobileHeaderProps = {
  title: string;
};

function MobileHeader(props: MobileHeaderProps) {
  return (
    <HStack
      className="py-6 px-4 border-b border-border-50 bg-background-0 items-center"
      space="md"
    >
      <HeaderBackButton />
      <Text className="text-xl">{props.title}</Text>
    </HStack>
  );
}

export default MobileHeader;
