import React, { useState } from "react";
import { Icon, Pressable } from "@gluestack-ui/themed";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import { Icon as LCNIcon } from "lucide-react-native";
import { Inbox } from "lucide-react-native";
import { GlobeIcon } from "../../assets/icons/globe";
import { HomeIcon } from "../../assets/icons/home";
import { HeartIcon } from "../../assets/icons/heart";
import { ProfileIcon } from "../../assets/icons/profile";
type Icons = {
  iconName: LucideIcon | typeof LCNIcon;
};

const list: Icons[] = [
  {
    iconName: ProfileIcon,
  },
  {
    iconName: HomeIcon,
  },
  {
    iconName: Inbox,
  },
  {
    iconName: GlobeIcon,
  },
  {
    iconName: HeartIcon,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handlePress = (index: number) => {
    setSelectedIndex(index);
    // router.push("/dashboard/dashboard-layout");
  };

  return (
    <VStack
      className="w-14 pt-5 h-full items-center border-r border-border-300"
      space="xl"
    >
      {list.map((item, index) => {
        return (
          <Pressable
            key={index}
            className="hover:bg-background-50"
            onPress={() => handlePress(index)}
          >
            <Icon
              as={item.iconName}
              className={`w-[55px] h-9 stroke-background-800 
                ${index === selectedIndex ? "fill-background-800" : "fill-none"}
  
                `}
            />
          </Pressable>
        );
      })}
    </VStack>
  );
};

export default Sidebar;