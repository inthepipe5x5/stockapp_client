import DashLayout from "@/screens/layout";
import { useUserSession } from "@/contexts/userSessionProvider";
import defaultUserPreferences from "@/constants/userPreferences";
import { useEffect, useState } from "react";
import SettingsForm from "./form";
import { Settings } from "react-native";

//settings screen
const SettingsView = (props) => {
  const [userPreferences, setUserPreferences] = useState({
    ...defaultUserPreferences,
  });
  const { state } = useUserSession();
  useEffect(() => {
    if (state && state.preferences) {
      //set preferences to state.preferences
      setUserPreferences((prevPreferences) => ({
        ...prevPreferences,
        ...state.preferences,
      }));
    }
  }, [state]);

  return <SettingsForm defaultValues={userPreferences} />;
};

export default () => (
  <DashLayout>
    <SettingsView />
  </DashLayout>
);
