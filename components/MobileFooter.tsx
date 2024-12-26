import {HStack, Text, Pressable} from '@gluestack-ui/themed';
import {Platform} from 'react-native';
import { useRouter } from 'expo-router';
import { cn } from "@gluestack-ui/nativewind-utils/cn";
import { Icon } from "@/components/ui/icon";

//Mobile Footer used in dashboard, newsfeed & profile layout
function MobileFooter({ footerIcons }: { footerIcons: any }) {
    const router = useRouter();
    return (
      <HStack
        className={cn(
          "bg-background-0 justify-between w-full absolute left-0 bottom-0 right-0 p-3 overflow-hidden items-center  border-t-border-300  md:hidden border-t",
          { "pb-5": Platform.OS === "ios" },
          { "pb-5": Platform.OS === "android" }
        )}
      >
        {footerIcons.map(
          (
            item: { iconText: string; iconName: any, route: string },
            index: React.Key | null | undefined
          ) => {
            return (
              <Pressable
                className="px-0.5 flex-1 flex-col items-center"
                key={index}
                onPress={() => router.push(`./${item.route}`)}
              >
                <Icon
                  as={item.iconName}
                  size="md"
                  className="h-[32px] w-[65px]"
                />
                <Text className="text-xs text-center text-typography-600">
                  {item.iconText}
                </Text>
              </Pressable>
            );
          }
        )}
      </HStack>
    );
  }

export default MobileFooter;