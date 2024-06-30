/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
export const primaryColor = "#0a7ea4";

export const Colors = {
  base0: "#fff",
  base5: "#f0f0f0",
  base25: "#b3b3b3",
  base50: "#848484",
  base100: "#262730",
  baseContent: "#262730",
  primary: "#065f46",
  primaryContent: "#eaebde",
  secondary: "#2274A5",
  secondaryContent: "#b0cbda",
  accent: "#FFA47D",
  accentContent: "#511c05",
  success: "#77BA99",
  warning: "#ecebff",
  error: "#D33F49",
  info: "#78dcca",
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
