import React, { useContext } from "react";
import { RelativePathString, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { componentsList } from "@/utils/list";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { Image as ExpoImage } from "expo-image";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { cssInterop } from "nativewind";
import { ColorModeContext } from "./_layout";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { ChevronRightIcon, Icon } from "@/components/ui/icon";

import CustomHeader from "./CustomHeader";
import ComponentCard from "./ComponentCard";

cssInterop(SafeAreaView, { className: "style" });
cssInterop(ExpoImage, { className: "style" });

type ComponentsList = {
    title: string;
    link: RelativePathString;
    url: string;
    darkUrl: string;
}[];

/**Homescreen component from GlueStack UI v2 kitchen sink app
 * SOURCE: https://github.com/gluestack/kitchen-sink-gluestack-ui-v2/blob/main/app/index.tsx
 *
 * @returns Component View => to be used for rendering mini dashboards eg. for households or inventories
 */
export default function ComponentView(componentsList: ComponentsList) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background-0 relative">
      <ScrollView>
        <Box className="bg-background-50 flex-1">
          <CustomHeader />
        </Box>
        <HStack className="flex-wrap justify-center gap-x-3 gap-y-4 md:gap-x-4 lg:gap-x-7 lg:gap-y-8 py-6 px-5 md:px-8 md:pt-9 xl:pt-[90px] lg:pt-[70px] lg:px-[70px] xl:px-[100px] max-w-[1730px] mx-auto">
          {componentsList.map((component, index) => (
            <Box
              key={index}
              className="w-[160px] h-[145px] md:w-[224px] md:h-[194px] lg:w-[274px] lg:h-[244px] xl:w-[390px] xl:h-[328px]"
            >
              <ComponentCard
                component={component}
                //@ts-ignore
                onPress={() => router.push(component.link)}
              />
            </Box>
          ))}
        </HStack>

        {/* <Box className="bg-background-0">
            <Grid
              className="gap-x-3 gap-y-4 md:gap-x-4 lg:gap-x-7 lg:gap-y-8 py-6 px-5 md:px-8 md:pt-9 xl:pt-[90px] lg:pt-[70px] lg:px-[70px] xl:px-[100px] max-w-[1730px] mx-auto"
              _extra={{
                className: "grid-cols-2 md:grid-cols-3",
              }}
            >
              {componentsList.map((component, index) => (
                <GridItem key={index} _extra={{ className: "col-span-1" }}>
                  <ComponentCard
                    component={component}
                    //@ts-ignore
                    onPress={() => router.push(component.link)}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box> */}
      </ScrollView>
    </SafeAreaView>
  );
}
