import { StyleSheet, View } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { Colors } from "@/lib/constants";

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <Onboarding
        pages={[
          {
            backgroundColor: Colors.secondary,
            image: (
              <View>
                <LottieView
                  source={require("../../assets/animations/Weightlifting competition")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Onboarding Screen",
            subtitle:
              "Done with React native Onboarding Swiper this is better Pretty",
          },

          {
            backgroundColor: "#FEFBF3",
            image: (
              <View>
                <LottieView
                  source={require("../../assets/animations/Gym dubble.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Main Screen",
            subtitle:
              "Done with React native Onboarding Swiper this is better Pretty",
          },

          {
            backgroundColor: "#F0FDF9",
            image: (
              <View>
                <LottieView
                  source={require("../../assets/animations/Weightlifting competition")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Super Screen",
            subtitle:
              "Done with React native Onboarding Swiper this is better Pretty",
          },
        ]}
        // bottomBarColor="black"
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  lottie: {
    width: 300,
    height: 300,
  },
});
