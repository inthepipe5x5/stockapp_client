import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";

const ThemeContext = createContext();
//theme context for app styling
export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const [preferences, setPreferences] = useState({});

/**
 * The function `updatePreferences` updates the preferences state with new preferences and sets the
 * theme if it is included in the new preferences.
 */
  const updatePreferences = (newPreferences) => {
    setPreferences((oldPreferences) => {
      const updatedPreferences = { ...oldPreferences, ...newPreferences };
      if (updatedPreferences?.theme) {
        setTheme(updatedPreferences.theme);
      }
      return updatedPreferences;
    });
  };

  useEffect(async () => {
    //check if session
    const storedSession = await SecureStore.getItemAsync(`${appName}_session`);
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      const { theme } = parsedSession?.profiles?.preferences;
      setTheme(theme);
    } else {
      setTheme(colorScheme);
    }
  }, [colorScheme]);

  const value = {
    theme,
    colors: Colors[theme],
    setTheme,
    preferences,
    setPreferences,
    updatePreferences,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
