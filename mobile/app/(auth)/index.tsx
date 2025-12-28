import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingStyle } from "@/assets/styles/onboarding-style";
import { router } from "expo-router";
import Button from "@/components/button";

const Onboarding = () => {
  return (
    <ScrollView
      contentContainerStyle={OnboardingStyle.container}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={OnboardingStyle.subContainer}>
        <View style={OnboardingStyle.header}>
          <View style={OnboardingStyle.logoContainer}>
            <Text style={OnboardingStyle.logoMain}>Fit</Text>
            <Text style={OnboardingStyle.logoAccent}>Freak</Text>
          </View>
          <View style={OnboardingStyle.badge}>
            <Text style={OnboardingStyle.badgeText}>
              Your Fitness Gym Companion
            </Text>
          </View>
        </View>

        <View style={OnboardingStyle.imageContainer}>
          <Image
            source={require("../../assets/images/fitness.png")}
            style={OnboardingStyle.image}
          />
        </View>

        <View style={OnboardingStyle.content}>
          <Text style={OnboardingStyle.heading}>
            Track your <Text style={OnboardingStyle.headingAccent}>GYM</Text>{" "}
            journey
          </Text>

          <View style={OnboardingStyle.features}>
            <View style={OnboardingStyle.featureItem}>
              <View style={OnboardingStyle.featureDot} />
              <Text style={OnboardingStyle.featureText}>Monitor workouts</Text>
            </View>
            <View style={OnboardingStyle.featureItem}>
              <View style={OnboardingStyle.featureDot} />
              <Text style={OnboardingStyle.featureText}>Track progress</Text>
            </View>
            <View style={OnboardingStyle.featureItem}>
              <View style={OnboardingStyle.featureDot} />
              <Text style={OnboardingStyle.featureText}>Reach your goals</Text>
            </View>
          </View>
        </View>

        <View style={OnboardingStyle.actions}>
          <Button
            onPress={() => router.push("/sign-in")}
            text="Sign In"
            variant="dark"
            customStyle={OnboardingStyle.primaryButton}
          />
          <Button
            onPress={() => router.push("/sign-up")}
            text="Sign Up"
            variant="light"
            customStyle={OnboardingStyle.secondaryButton}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Onboarding;
