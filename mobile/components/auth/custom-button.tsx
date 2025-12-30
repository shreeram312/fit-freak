import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ActivityIndicator,
} from "react-native";
import { Colors, FontFamily } from "@/lib/constants";

type CustomButtonProps = {
  text: string;
  loading?: boolean;
} & PressableProps;

export default function CustomButton({
  text,
  loading,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        props.disabled && styles.buttonDisabled,
      ]}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
});
