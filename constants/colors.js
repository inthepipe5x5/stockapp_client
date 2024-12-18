/* This block of code is defining a JavaScript object that exports two themes: light and dark. Each
theme has specific color values for text, background, tint, tabIconDefault, and tabIconSelected. The
`tintColorLight` and `tintColorDark` constants are used to set the tint color for the light and dark
themes respectively. The object structure allows for easy switching between light and dark themes in
a JavaScript application. */
const tintColorLight = '#2f95dc'; //https://www.color-hex.com/color/2f95dc
const tintColorDark = '#fff'; //white //https://www.color-hex.com/color/ffffff

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000', //black
    tint: tintColorDark,
    tabIconDefault: '#ccc', //grey //https://www.color-hex.com/color/cccccc
    tabIconSelected: tintColorDark,
  },
};