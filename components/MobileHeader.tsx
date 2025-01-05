import { Text } from "@gluestack-ui/themed";
import { HStack } from "./ui/hstack";
import HeaderBackButton from "./navigation/HeaderBackButton";
import UserMenu from "./navigation/UserMenu";
import { useRouter } from "expo-router";
import useThemeContext from "@/contexts/useThemeContext";

type MobileHeaderProps = {
  title: string;
};

function MobileHeader(props: MobileHeaderProps) {
  const router = useRouter();
  return (
    <HStack
      className="py-6 px-4 border-b border-border-50 bg-background-0 items-center justify-between"
      space="md"
    >
      <HeaderBackButton />
      <HeaderAppIcon width={50} height={50} theme={theme} />
      <UserMenu />
    </HStack>
  );
}

export default MobileHeader;
