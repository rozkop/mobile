import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import Button from "./Button";

function ManageOptionItem({ iconName, optionText, onPress, color }) {
  return (
    <Button
      additionalStyle={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View style={styles.optionContainer}>
        <MaterialCommunityIcons
          name={iconName}
          size={25}
          color={Colors.background}
        />
        <Text style={styles.optionText}>{optionText}</Text>
      </View>
    </Button>
  );
}

export default ManageOptionItem;

const styles = StyleSheet.create({
  optionContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  optionText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
