import { HStack, Text, Pressable } from "@gluestack-ui/themed";
import {
  Avatar,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Icon, MenuIcon } from "@/components/ui/icon";

type HeaderProps = {
  title: string;
  toggleSidebar: () => void;
};

function WebHeader(props: HeaderProps) {
  return (
    <HStack className="pt-4  pr-10 pb-3 bg-background-0 items-center justify-between border-b border-border-300">
      <HStack className="items-center">
        <Pressable
          onPress={() => {
            props.toggleSidebar();
          }}
        >
          <Icon as={MenuIcon} size="lg" className="mx-5" />
        </Pressable>
        <Text className="text-2xl">{props.title}</Text>
      </HStack>

      <Avatar className="h-9 w-9">
        <AvatarFallbackText className="font-light">A</AvatarFallbackText>
      </Avatar>
    </HStack>
  );
}

export default WebHeader;
