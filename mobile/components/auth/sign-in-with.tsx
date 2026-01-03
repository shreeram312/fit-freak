import CustomButton from "./custom-button";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useEffect, useCallback } from "react";
import { useSSO } from "@clerk/clerk-expo";
//@ts-ignore
import googleButton from "@/assets/social-providers/google.png";
import { Pressable, Image, Text, StyleSheet, View } from "react-native";
import { router, useRouter } from "expo-router";
import { Colors, FontFamily } from "@/lib/constants";
import axios from "axios";

const EXPO_BACKEND_API_URL = process.env.EXPO_BACKEND_API_URL;
export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

type SignInWithProps = {
  strategy: "oauth_google";
};

const strategyIcons = {
  oauth_google: googleButton,
};

export default function SignInWith({ strategy }: SignInWithProps) {
  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy,
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        console.log(
          "createdSessionId",
          JSON.stringify(createdSessionId, null, 2)
        );

        if (signUp?.status === "complete") {
          console.log(
            signUp?.emailAddress,
            signUp.createdUserId,
            signUp?.firstName + " " + signUp?.lastName
          );
          await axios.post(`${EXPO_BACKEND_API_URL}/api/auth/sign-up`, {
            email: signUp?.emailAddress,
            clerkId: signUp.createdUserId,
            name: signUp?.firstName + " " + signUp?.lastName,
          });
        }

        router.push("/(tabs)");
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.horizontalBar,
        pressed && styles.horizontalBarPressed,
      ]}
    >
      <View style={styles.barContent}>
        <Image
          source={strategyIcons[strategy]}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.barText}>Continue with Google</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  horizontalBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: "100%",
  },
  horizontalBarPressed: {
    opacity: 0.8,
    backgroundColor: Colors.background,
  },
  barContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  barText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.darkText,
  },
});
