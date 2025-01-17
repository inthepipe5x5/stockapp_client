import { Button } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import  supabase  from "../services/supabase/supabase.js";

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = AuthSession.makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

type Provider = "google" | "facebook" | "apple";

const performOAuth = async (
  provider: Provider = "google"
) => {
  const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) throw error;

  if (data?.url) {
    const result = await AuthSession.startAsync({ authUrl: data.url });
    if (result.type === "success") {
      // Send tokens to your backend
      await (
        result.params.access_token,
        result.params.refresh_token
      );
      // Your backend handles session creation and returns necessary info
      // You can then update your app's state accordingly
    }
  }
};

const sendMagicLink = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: "valid.email@supabase.io",
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) throw error;
  // Email sent.
};

export default function Auth() {
  // Handle linking into app from email app.
  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  return (
    <>
      <Button onPress={performOAuth} title="Sign in with Github" />
      <Button onPress={sendMagicLink} title="Send Magic Link" />
    </>
  );
}
