import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import { Colors, width } from "@/lib/constants";

interface ButtonProps {
  text: string;
  variant: "dark" | "light"; // Use optional prop
  onPress: () => void;
  customStyle?: ViewStyle; // Fix: Use ViewStyle instead of string
}

const Button: FC<ButtonProps> = ({ onPress, text, variant, customStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        customStyle, // Ensures custom styles override default styles
        {
          backgroundColor: variant === "dark" ? Colors.primary : "white",
        },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          { color: variant === "dark" ? "white" : "black" },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: width * 0.4, // Default width, overridden by customStyle if provided
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
