import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { isClerkAPIResponseError } from "@clerk/clerk-expo";
import { AuthStyle } from "@/assets/styles/auth-style";
import CustomInput from "./custom-input";
import CustomButton from "./custom-button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

const verifyEmailSchema = z.object({
  code: z
    .string({ message: "Verification code is required" })
    .min(6, "Code must be 6 digits")
    .max(6, "Code must be 6 digits"),
});

type VerifyEmailFields = z.infer<typeof verifyEmailSchema>;

interface VerifyEmailProps {
  email: string;
  onBack: () => void;
}

const VerifyEmail = ({ email, onBack }: VerifyEmailProps) => {
  const { signUp, isLoaded, setActive } = useSignUp();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<VerifyEmailFields>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const [isResending, setIsResending] = useState(false);

  const onVerify = async (data: VerifyEmailFields) => {
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)");
      } else {
        setError("root", { message: "Verification could not be completed" });
      }
    } catch (err) {
      console.log("Verification error: ", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        err.errors.forEach((error) => {
          if (error.meta?.paramName === "code") {
            setError("code", {
              message: error.longMessage,
            });
          } else {
            setError("root", { message: error.longMessage });
          }
        });
      } else {
        setError("root", { message: "Unknown error occurred" });
      }
    }
  };

  const handleResend = async () => {
    if (!isLoaded || isResending) return;

    setIsResending(true);
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (err) {
      console.log("Resend error: ", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        setError("root", {
          message: err.errors[0]?.longMessage || "Failed to resend code",
        });
      }
    } finally {
      setIsResending(false);
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
          <Text style={AuthStyle.title}>Verify your email</Text>
          <Text style={AuthStyle.subtitle}>
            We've sent a verification code to{"\n"}
            <Text style={styles.emailText}>{email}</Text>
          </Text>
        </View>

        <View style={AuthStyle.form}>
          <CustomInput
            control={control}
            name="code"
            placeholder="Enter 6-digit code"
            autoFocus
            keyboardType="number-pad"
            maxLength={6}
            autoCapitalize="none"
          />

          {errors.root && (
            <Text style={AuthStyle.errorText}>{errors.root.message}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton text="Verify" onPress={handleSubmit(onVerify)} />
        </View>

        <View style={styles.resendContainer}>
          <Text style={AuthStyle.linkText}>Didn't receive the code? </Text>
          <Pressable onPress={handleResend} disabled={isResending}>
            <Text
              style={[AuthStyle.link, isResending && styles.resendDisabled]}
            >
              {isResending ? "Resending..." : "Resend code"}
            </Text>
          </Pressable>
        </View>

        <View style={AuthStyle.linkContainer}>
          <Pressable onPress={onBack}>
            <Text style={AuthStyle.linkText}>← Back to sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emailText: {
    fontFamily: "Montserrat-SemiBold",
    color: "#111827",
  },
  buttonContainer: {
    marginTop: 24,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    flexWrap: "wrap",
    gap: 4,
  },
  resendDisabled: {
    opacity: 0.5,
  },
});

export default VerifyEmail;
