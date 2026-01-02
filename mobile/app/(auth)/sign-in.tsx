import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from "react-native";
import CustomInput from "@/components/auth/custom-input";
import CustomButton from "@/components/auth/custom-button";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import SignInWith from "@/components/auth/sign-in-with";
import { AuthStyle } from "@/assets/styles/auth-style";

const signInSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email"),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password should be at least 8 characters long"),
});

type SignInFields = z.infer<typeof signInSchema>;

const mapClerkErrorToFormField = (error: any) => {
  switch (error.meta?.paramName) {
    case "identifier":
      return "email";
    case "password":
      return "password";
    default:
      return "root";
  }
};

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFields>({
    resolver: zodResolver(signInSchema),
  });

  const { signIn, isLoaded, setActive } = useSignIn();

  const onSignIn = async (data: SignInFields) => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === "complete") {
        setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.log("Sign in failed");
        setError("root", { message: "Sign in could not be completed" });
      }
    } catch (err) {
      console.log("Sign in error: ", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        err.errors.forEach((error) => {
          const fieldName = mapClerkErrorToFormField(error);
          setError(fieldName, {
            message: error.longMessage,
          });
        });
      } else {
        setError("root", { message: "Unknown error" });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={AuthStyle.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={AuthStyle.header}>
          <View style={AuthStyle.logoContainer}>
            <Text style={AuthStyle.logoMain}>Fit</Text>
            <Text style={AuthStyle.logoAccent}>Freak</Text>
          </View>
          <Text style={AuthStyle.title}>Welcome back</Text>
          <Text style={AuthStyle.subtitle}>
            Sign in to continue your fitness journey
          </Text>
        </View>

        <View style={AuthStyle.form}>
          <CustomInput
            control={control}
            name="email"
            placeholder="Email"
            autoFocus
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />

          <CustomInput
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry
            autoComplete="password"
          />

          {errors.root && (
            <Text style={AuthStyle.errorText}>{errors.root.message}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton text="Sign In" onPress={handleSubmit(onSignIn)} />
        </View>

        <View style={AuthStyle.linkContainer}>
          <Text style={AuthStyle.linkText}>Don't have an account? </Text>
          <Link href="/(auth)/sign-up" asChild>
            <Text style={AuthStyle.link}>Sign up</Text>
          </Link>
        </View>

        <View style={AuthStyle.divider}>
          <View style={AuthStyle.dividerLine} />
          <Text style={AuthStyle.dividerText}>Or continue with</Text>
          <View style={AuthStyle.dividerLine} />
        </View>

        <View style={AuthStyle.socialContainer}>
          <View style={styles.socialButtons}>
            <SignInWith strategy="oauth_google" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 24,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
});
