import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

const HomeScreen = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>index</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
          router.push("/(auth)/sign-in");
        }}
      />
    </View>
  );
};

export default HomeScreen;
