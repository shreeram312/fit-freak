import { Colors, FontFamily, height, width } from "@/lib/constants";
import { StyleSheet } from "react-native";

export const OnboardingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 12,
  },
  logoMain: {
    fontSize: 42,
    fontFamily: FontFamily.extraBold,
    color: Colors.darkText,
    letterSpacing: -0.5,
  },
  logoAccent: {
    fontSize: 42,
    fontFamily: FontFamily.extraBold,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: Colors.primary,
    letterSpacing: 0.5,
    marginBottom: -3,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: "contain",
  },
  content: {
    marginBottom: 40,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontFamily: FontFamily.semiBold,
    color: Colors.darkText,
    textAlign: "center",
    marginBottom: 1,
  },
  headingAccent: {
    color: Colors.primary,
  },

  features: {
    width: "100%",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  featureText: {
    fontSize: 15,
    fontFamily: FontFamily.medium,
    color: Colors.lightText,
  },
  actions: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 50,
    marginBottom: 0,
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.lightText,
    marginBottom: 0,
  },
});
