import * as default_preferences from "./default_preferences.json";
/** ---------------------------
 *        Default preferences
 *  ---------------------------
 *  Default user preferences for the application.
 */

const defaultUserPreferences =
  typeof default_preferences === "object"
    ? default_preferences
    : JSON.parse(default_preferences);
export default defaultUserPreferences;
