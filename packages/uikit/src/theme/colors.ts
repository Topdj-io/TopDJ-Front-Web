import { Colors } from "./types";

export const baseColors = {
  failure: "#FF2E2E",
  primary: "#8AFA0F",
  primaryBright: "#53DEE9",
  primaryDark: "#0098A1",
  secondary: "#2C9623",
  success: "#2C9623",
  warning: "#FFB237",
};

export const brandColors = {
  binance: "#F0B90B",
};

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  background: "#000",
  backgroundDisabled: "#E9EAEB",
  contrast: "#fff",
  invertedContrast: "#FFFFFF",
  input: "#F8F8F8",
  inputSecondary: "#d7caec",
  tertiary: "#000",
  text: "#fff",
  textDisabled: "#BDC2C4",
  textSubtle: "#87C182",
  borderColor: "#E9EAEB",
  card: "#171719",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)",
  },
};

export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  secondary: "#9A6AFF",
  background: "#100C18",
  backgroundDisabled: "#3c3742",
  contrast: "#FFFFFF",
  invertedContrast: "#191326",
  input: "#483f5a",
  inputSecondary: "#66578D",
  primaryDark: "#0098A1",
  tertiary: "#353547",
  text: "#EAE2FC",
  textDisabled: "#666171",
  textSubtle: "#A28BD4",
  borderColor: "#524B63",
  card: "#27262c",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
  },
};
