import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

function FloatingButton({ onPress, name }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle} onPress={onPress}>
        <Octicons name={name} size={30} color={Colors.background} />
      </TouchableOpacity>
    </View>
  );
}

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    backgroundColor: Colors.accent500,
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
