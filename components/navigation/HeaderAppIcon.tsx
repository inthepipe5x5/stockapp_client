import React from "react";
import { Button, ButtonIcon } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import AppIcon from "./AppIcon";

const HeaderAppIcon = (props) => {
  const router = useRouter();
  const { state } = useUserSession();

  const handlePress = () => {
    if (state.user) {
      router.push("/(tabs)/(dashboard)/index");
    } else {
      router.push("/(auth)/index");
    }
  };

  return (
    <Button onPress={handlePress} className="p-2">
      <ButtonIcon as={AppIcon} {...props} />
    </Button>
  );
};

export default HeaderAppIcon;