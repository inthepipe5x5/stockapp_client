import {GoogleIcon} from "../screens/auth/signin/assets/icons"
import { Apple } from "lucide-react-native"
import { Facebook } from "lucide-react-native"
import facebook from glue
const authProviders = Object.freeze({

    EMAIL: "email", //for users who use a magic link sent by email
    SOCIAL: {
        GOOGLE: {slug: "google", name: "Google", icon: GoogleIcon},
        APPLE: "apple",
        FACEBOOK: "facebook",
    }
})

class AuthProviderMapper {
    static providers = authProviders
    
}


export {authProviders}