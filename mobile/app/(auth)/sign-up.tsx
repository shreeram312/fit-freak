import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import CustomInput from "@/components/auth/custom-input";
import CustomButton from "@/components/auth/custom-button";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import SignInWith from "@/components/auth/sign-in-with";
import { AuthStyle } from "@/assets/styles/auth-style";
import axios from "axios";
import { useState } from "react";
import VerifyEmail from "@/components/auth/verify-email";

const signUpSchema = z
  .object({
    email: z.string({ message: "Email is required" }).email("Invalid email"),
    password: z
      .string({ message: "Password is required" })
      .min(8, "Password should be at least 8 characters long"),
    confirmPassword: z
      .string({ message: "Please confirm your password" })
      .min(8, "Password should be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFields = z.infer<typeof signUpSchema>;

const mapClerkErrorToFormField = (error: any) => {
  switch (error.meta?.paramName) {
    case "email_address":
      return "email";
    case "password":
      return "password";
    default:
      return "root";
  }
};

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
  });

  const { signUp, isLoaded, setActive } = useSignUp();
  const [isPendingVerification, setIsPendingVerification] = useState(false);
  // const api = createPublicApiClient();

  const onSignUp = async (data: SignUpFields) => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setIsPendingVerification(true);
    } catch (err) {
      console.log("Sign up error: ", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        err.errors.forEach((error) => {
          const fieldName = mapClerkErrorToFormField(error);
          setError(fieldName, {
            message: error.longMessage,
          });
        });
      } else {
        setError("root", { message: "Unknown error occurred" });
      }
    }
  };

  if (isPendingVerification) {
    return (
      <VerifyEmail
        email={signUp?.emailAddress || ""}
        onBack={() => setIsPendingVerification(false)}
      />
    );
  }

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
          <Text style={AuthStyle.title}>Create account</Text>
          <Text style={AuthStyle.subtitle}>
            Join FitFreak and start your fitness journey today
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
            autoComplete="password-new"
          />

          <CustomInput
            control={control}
            name="confirmPassword"
            placeholder="Confirm Password"
            secureTextEntry
            autoComplete="password-new"
          />

          {errors.root && (
            <Text style={AuthStyle.errorText}>{errors.root.message}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton text="Sign Up" onPress={handleSubmit(onSignUp)} />
        </View>

        <View style={AuthStyle.linkContainer}>
          <Text style={AuthStyle.linkText}>Already have an account? </Text>
          <Link href="/(auth)/sign-in" asChild>
            <Text style={AuthStyle.link}>Sign in</Text>
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
