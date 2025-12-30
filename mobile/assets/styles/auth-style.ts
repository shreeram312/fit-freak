import { Colors, FontFamily } from "@/lib/constants";
import { StyleSheet } from "react-native";

export const AuthStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
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
    fontSize: 36,
    fontFamily: FontFamily.extraBold,
    color: Colors.darkText,
    letterSpacing: -0.5,
  },
  logoAccent: {
    fontSize: 36,
    fontFamily: FontFamily.extraBold,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 28,
    fontFamily: FontFamily.bold,
    color: Colors.darkText,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightText,
    textAlign: "center",
  },
  form: {
    gap: 20,
    marginTop: 32,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 4,
  },
  linkText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.lightText,
  },
  link: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: Colors.primary,
  },
  socialContainer: {
    marginTop: 32,
    gap: 12,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.lightText,
  },
  errorText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: "#DC2626",
    marginTop: -4,
  },
});
