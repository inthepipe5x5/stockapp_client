import { useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
// import { Image } from "expo-image";
import { ScrollView } from "@/components/ui/scroll-view";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import WebHeader from "@/components/WebHeader";
import MobileHeader from "@/components/MobileHeader";
import { Sidebar, SideBarContentList } from "@/components/Sidebar";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

//DashboardLayout component - main content layout used in dashboard screens, newsfeed screens, profile screens
//This layout has a sidebar, header and children components
const DashboardLayout = (props: any) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    props.isSidebarVisible || false
  );
  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack className="h-full w-full bg-background-0">
          {Platform.OS === "web" ? (
            <Box className="md:hidden">
              <MobileHeader title={props.title} />
            </Box>
          ) : (
            <Box className="hidden md:flex">
              <WebHeader toggleSidebar={toggleSidebar} title={props.title} />
            </Box>
          )}

          <VStack className="h-full w-full">
            <HStack className="h-full w-full">
              <Box className="hidden md:flex h-full">
                {isSidebarVisible && <Sidebar iconList={SideBarContentList} />}
              </Box>
              <VStack className="w-full flex-1">{props.children}</VStack>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardLayout;
