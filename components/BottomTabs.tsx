import type { LucideIcon } from "lucide-react-native";
import { Icon, Inbox, HouseIcon, BoxIcon, Key, UserPlus2Icon, ScanSearchIcon } from "lucide-react-native";
import { HomeIcon } from "../assets/icons/home";

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

const anonBottomTabsList: BottomTabs[] = [
  {
    iconName: HomeIcon,
    iconText: "Home",
    route: "/",
  },
  {
    iconName: Key,
    iconText: "Sign In",
    route: "(auth)/index",
  },
  {
    iconName: UserPlus2Icon,
    iconText: "Sign Up",
    route: "(auth)/signup",
  },
  {
    iconName: ScanSearchIcon, // users can scan a QR code to sign in or sign up
    iconText: "Scan",
    route: "(auth)/scan",
  }
]
export { bottomTabsList, anonBottomTabsList, BottomTabs };
