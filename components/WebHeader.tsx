import { HStack, Text, Pressable } from "@gluestack-ui/themed";
import { Icon, MenuIcon } from "@/components/ui/icon";
import HeaderAppIcon from "./navigation/HeaderAppIcon";
import UserMenu from "./navigation/UserMenu";
import { useThemeContext } from "@/contexts/ThemeContext";

type HeaderProps = {
  title: string;
  toggleSidebar: () => void;
};

function WebHeader(props: HeaderProps) {
  const { theme } = useThemeContext();
  return (
    <HStack className="pt-4 pr-10 pb-3 bg-background-0 items-center justify-between border-b border-border-300">
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
      <HeaderAppIcon width={50} height={50} theme={theme} />
      <UserMenu />
    </HStack>
  );
}

export default WebHeader;
