import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { FontFamily } from "@/lib/constants";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [FontFamily.black]: require("../assets/fonts/Montserrat-Black.ttf"),
    [FontFamily.blackItalic]: require("../assets/fonts/Montserrat-BlackItalic.ttf"),
    [FontFamily.bold]: require("../assets/fonts/Montserrat-Bold.ttf"),
    [FontFamily.boldItalic]: require("../assets/fonts/Montserrat-BoldItalic.ttf"),
    [FontFamily.extraBold]: require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    [FontFamily.extraBoldItalic]: require("../assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    [FontFamily.extraLight]: require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    [FontFamily.extraLightItalic]: require("../assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    [FontFamily.italic]: require("../assets/fonts/Montserrat-Italic.ttf"),
    [FontFamily.light]: require("../assets/fonts/Montserrat-Light.ttf"),
    [FontFamily.lightItalic]: require("../assets/fonts/Montserrat-LightItalic.ttf"),
    [FontFamily.medium]: require("../assets/fonts/Montserrat-Medium.ttf"),
    [FontFamily.mediumItalic]: require("../assets/fonts/Montserrat-MediumItalic.ttf"),
    [FontFamily.regular]: require("../assets/fonts/Montserrat-Regular.ttf"),
    [FontFamily.semiBold]: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    [FontFamily.semiBoldItalic]: require("../assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    [FontFamily.thin]: require("../assets/fonts/Montserrat-Thin.ttf"),
    [FontFamily.thinItalic]: require("../assets/fonts/Montserrat-ThinItalic.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }

  return <Slot />;
}
