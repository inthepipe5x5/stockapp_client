import ParallaxScrollView from "../components/ParallaxScrollView"
import * as loginImage from "../assets/auth/login.png" 
import { VStack, Title, Text, Button } from "@gluestack-ui/themed";
import { useTheme, useStyled } from "@gluestack-ui/themed";

//TODO: fix this AnonHomeContent later
const AnonHomeContent = (<VStack>
    <Title>
        Anon Home Title
    </Title>
    <Text>
        Anon Home Text
    </Text>
    <Button variant="solid" action="primary" onPress={()=>{
        router.push("/login")
    }}>
        Login
    </Button>
    <Button variant="outline" action="secondary" onPress={()=>{
        router.push("/signup")
    }}>
        Sign Up
    </Button>

</VStack>);

//AnonHomeView that is rendered when no user is found locally stored
const AnonHomeView = async () => {
    //get the opposite color of the main color based on the global color mode
    const { theme } = useTheme();
    const { style } = useStyled();
    const globalOppositeColorMode = style.mode.toLowerCase() === 'dark' ? "light" : "dark";
    const headerBgColor = theme[globalOppositeColorMode].color;

    return (
        <ParallaxScrollView content={AnonHomeContent} backgroundImage={loginImage} headerBackgroundColor={headerBgColor} />
    );
}

export default AnonHome;