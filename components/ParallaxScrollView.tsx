import type { PropsWithChildren, ReactElement } from "react";
import { Platform } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Box } from "@gluestack-ui/themed"; // Gluestack components
import MobileHeader from "../components/MobileHeader.jsx";
import MobileFooter from "../components/MobileFooter.jsx";
import { Sidebar, Icons, SideBarContentList } from "../components/Sidebar";
import { useColorScheme } from "../hooks/useColorScheme";
import { viewPort } from "../constants/dimensions.js";
import { bottomTabsList, BottomTabs } from "../components/BottomTabs.jsx";

const HEADER_HEIGHT = viewPort?.header?.height ?? 250;

type Props = PropsWithChildren<{
  headerComponent?: ReactElement; // Allow flexibility for passing custom headers
  headerBackgroundColor: { dark: string; light: string };
  headerTitle?: string; // Optional prop for dynamic MobileHeader title
  FixedFooter?: ReactElement; // Allow flexibility for passing custom footers
  FooterContent?: BottomTabs[]; // Optional prop for dynamic BottomTabs
  sidebarProps?: Icons[]; // Sidebar props for icons
}>;

export default function ParallaxScrollView({
  children,
  headerComponent,
  headerBackgroundColor,
  headerTitle = "Default Title",
  sidebarProps = SideBarContentList,
  FixedFooter,
  FooterContent = bottomTabsList,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
        ),
      },
      {
        scale: interpolate(
          scrollOffset.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [2, 1, 1]
        ),
      },
    ],
  }));

  return (
    <Box flex={1} className="bg-background safe-area">
      {/* Sidebar for Web */}
      {Platform.OS === "web" && (
        <Sidebar
          iconList={sidebarProps || []}
          className="absolute top-0 left-0 h-full"
        />
      )}

      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          className={`h-[${HEADER_HEIGHT}px] flex justify-center items-center overflow-hidden`}
          style={[
            {
              backgroundColor: headerBackgroundColor[colorScheme],
            },
            headerAnimatedStyle,
          ]}
        >
          {headerComponent || <MobileHeader title={headerTitle} />}
        </Animated.View>

        <Box flex={1} className="p-4 gap-4">
          {children}
        </Box>
      </Animated.ScrollView>

      {FixedFooter || (
        <MobileFooter footerIcons={FooterContent || bottomTabsList} />
      )}
    </Box>
  );
}
