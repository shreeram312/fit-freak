import {
  TextInput,
  StyleSheet,
  TextInputProps,
  Text,
  View,
} from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Colors, FontFamily } from "@/lib/constants";

type CustomInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & TextInputProps;

export default function CustomInput<T extends FieldValues>({
  control,
  name,
  ...props
}: CustomInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <TextInput
            {...props}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={Colors.lightText}
            style={[
              styles.input,
              props.style,
              { borderColor: error ? "#DC2626" : Colors.border },
            ]}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderColor: Colors.border,
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.darkText,
    backgroundColor: Colors.white,
  },
  error: {
    color: "#DC2626",
    fontSize: 13,
    fontFamily: FontFamily.medium,
    marginLeft: 4,
  },
});
