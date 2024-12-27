import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";

/** Simple Back Button For Headers  */
const HeaderBackButton = () => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.back();
      }}
    >
      <Icon as={ChevronLeftIcon} />
    </Pressable>
  );
};

export default HeaderBackButton;
