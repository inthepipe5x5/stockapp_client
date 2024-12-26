import type { LucideIcon } from "lucide-react-native";
import { Icon } from "lucide-react-native";
import { Inbox } from "lucide-react-native";
import { GlobeIcon } from "../../assets/icons/globe";
import { HomeIcon } from "../../assets/icons/home";
import { HeartIcon } from "../../assets/icons/heart";
import { ProfileIcon } from "../../assets/icons/profile";

  
  type BottomTabs = {
    iconName: LucideIcon | typeof Icon;
    iconText: string;
  };
const bottomTabsList: BottomTabs[] = [
{
    iconName: HomeIcon,
    iconText: "Home",
},

{
    iconName: GlobeIcon,
    iconText: "Community",
},
{
    iconName: Inbox,
    iconText: "Inbox",
},
{
    iconName: HeartIcon,
    iconText: "Favourite",
},
{
    iconName: ProfileIcon,
    iconText: "Profile",
},
];