import { Pressable, StyleSheet } from "react-native";

function PostActionButton({ children, onPress, disabled }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed]}
      disabled={disabled}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

export default PostActionButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
