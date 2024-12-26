import { Text, Pressable } from "@gluestack-ui/themed";
import { HStack } from "../../components/ui/hstack";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";

import { useRouter } from "expo-router";

type MobileHeaderProps = {
  title: string;
};

function MobileHeader(props: MobileHeaderProps) {
  const router = useRouter();
  return (
    <HStack
      className="py-6 px-4 border-b border-border-50 bg-background-0 items-center"
      space="md"
    >
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <Icon as={ChevronLeftIcon} />
      </Pressable>
      <Text className="text-xl">{props.title}</Text>
    </HStack>
  );
}

export default MobileHeader;
