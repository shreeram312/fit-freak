import { Dimensions } from "react-native";

export enum Colors {
  primary = "#16A34A",
  secondary = "#F0FDF4",
  lightText = "#6B7280",
  darkText = "#111827",
  white = "#FFFFFF",
  background = "#FAFAFA",
  accent = "#84CC16",
  border = "#D1D5DB",
  success = "#22C55E",
}

export const FontFamily = {
  black: "Montserrat-Black",
  blackItalic: "Montserrat-BlackItalic",
  bold: "Montserrat-Bold",
  boldItalic: "Montserrat-BoldItalic",
  extraBold: "Montserrat-ExtraBold",
  extraBoldItalic: "Montserrat-ExtraBoldItalic",
  extraLight: "Montserrat-ExtraLight",
  extraLightItalic: "Montserrat-ExtraLightItalic",
  italic: "Montserrat-Italic",
  light: "Montserrat-Light",
  lightItalic: "Montserrat-LightItalic",
  medium: "Montserrat-Medium",
  mediumItalic: "Montserrat-MediumItalic",
  regular: "Montserrat-Regular",
  semiBold: "Montserrat-SemiBold",
  semiBoldItalic: "Montserrat-SemiBoldItalic",
  thin: "Montserrat-Thin",
  thinItalic: "Montserrat-ThinItalic",
};

export const { width, height } = Dimensions.get("window");
