import React, { useState } from "react";
import { Icon, Pressable } from "@gluestack-ui/themed";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import { Icon as LCNIcon } from "lucide-react-native";
import { Inbox } from "lucide-react-native";
import { GlobeIcon } from "../assets/icons/globe";
import { HomeIcon } from "../assets/icons/home";
import { HeartIcon } from "../assets/icons/heart";
import { ProfileIcon } from "../assets/icons/profile";

type Icons = {
  iconName: LucideIcon | typeof LCNIcon;
  iconText?: string;
};

type SidebarProps = {
  iconList: Icons[];

  className?: string;
  onPressHandler?: () => void; //handler function for the sidebar icon eg. go home
};

const SideBarContentList: Icons[] = [
  {
    iconName: ProfileIcon,
    iconText: "Profile",
  },
  {
    iconName: HomeIcon,
    iconText: "Home",
  },
  {
    iconName: Inbox,
    iconText: "Inbox",
  },
  {
    iconName: GlobeIcon,
    iconText: "Household",
  },
  {
    iconName: HeartIcon,
    iconText: "Favourites",
  },
];

const Sidebar = ({
  iconList = SideBarContentList,
  className = "w-14 pt-5 h-full items-center border-r border-border-300",
  onPressHandler,
}: SidebarProps) => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handlePress = (index: number) => {
    setSelectedIndex(index);
    // router.push("/dashboard/dashboard-layout");
    onPressHandler && onPressHandler();
  };

  return (
    <VStack
      className={
        className ?? "w-14 pt-5 h-full items-center border-r border-border-300"
      }
      space="xl"
    >
      {iconList.map((item, index) => {
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

export { Sidebar, SideBarContentList, Icons };
