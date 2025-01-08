import {
  HStack,
  VStack,
  Text,
  Avatar,
  AvatarFallbackText,
  Button,
  ButtonIcon,
  ButtonText,
} from "@gluestack-ui/themed";
import { DownloadIcon } from "lucide-react-native";

interface MemberData {
  bannerUri: string;
  name: string;
  description: string;
}

const MemberActionCards = (MEMBERS_DATA: MemberData[]) => {
  MEMBERS_DATA.map((item, index) => {
    return (
      <HStack
        className="p-4 items-center h-full border border-border-300 rounded-xl"
        space="lg"
        key={index}
      >
        <Avatar>
          <Avatar>
            <AvatarFallbackText>
              {" "}
              {item.name?.[0] ?? "User Name"}{" "}
            </AvatarFallbackText>
          </Avatar>
        </Avatar>
        <Button variant="outline" action="secondary" className="p-2">
          <ButtonIcon as={DownloadIcon} />
        </Button>
        <VStack>
          <Text className="font-semibold text-typography-900">
            {" "}
            {item.name}{" "}
          </Text>
          <Text className="line-clamp-1 text-sm"> {item.description} </Text>
        </VStack>
        <Button action="secondary" variant="outline">
          <ButtonText>Follow</ButtonText>
        </Button>
      </HStack>
    );
  });
  return MEMBERS_DATA;
};
export default MemberActionCards;
