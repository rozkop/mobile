import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/colors";

function Button({ children, isDisabled, onPress, additionalStyle }) {
  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        additionalStyle,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.accent500,
    elevation: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
