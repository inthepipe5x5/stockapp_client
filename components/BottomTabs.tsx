import type { LucideIcon } from "lucide-react-native";
import { Icon } from "lucide-react-native";
import { Inbox } from "lucide-react-native";
import { HouseIcon } from "lucide-react-native";
import { HomeIcon } from "../assets/icons/home";
import { ProfileIcon } from "../assets/icons/profile";
import { BoxIcon } from "lucide-react-native";

type BottomTabs = {
  iconName: LucideIcon | typeof Icon;
  iconText: string;
  route?: string;
};

const bottomTabsList: BottomTabs[] = [
  {
    iconName: HomeIcon,
    iconText: "Home",
    route: "/",
  },

  {
    iconName: HouseIcon,
    iconText: "Household",
    route: "/dashboard",
  },
  {
    iconName: Inbox,
    iconText: "Tasks",
    route: "/tasks",
  },
  {
    iconName: BoxIcon,
    iconText: "Products",
    route: "/products",
  },
  {
    iconName: ProfileIcon,
    iconText: "Profile",
    route: "/route",
  },
];

export { bottomTabsList, BottomTabs };
