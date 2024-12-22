import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { useTheme } from "@gluestack-style/react";

/**
 * The CustomButtonGroup component renders a group of buttons based on the provided data and theme.
 * @returns The `CustomButtonGroup` component is being returned. It maps over the `buttons` array and
 * renders a `Button` component for each button in the array. Each button has a width, rounded style,
 * and an `onPress` event that triggers the `action` function of the button with the `formData` as a
 * parameter. The button also displays the `label` of the button inside
 */
export const CustomButtonGroup = ({ buttons, formData }) => {
  const { theme } = useTheme();

  return (
    <View className="flex-row justify-between w-full mt-4">
      {buttons.map((button, index) => (
        <Button
          key={index}
          className={`w-[${
            button.width || "48%"
          }] rounded-full items-center py-2`}
          onPress={() => button.action(formData)}
        >
          <Text className={`${theme.Text.color} font-semibold`}>
            {button.label}
          </Text>
        </Button>
      ))}
    </View>
  );
};
