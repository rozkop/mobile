import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

import Colors from "../../../constants/colors";

function LoadingOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" color={Colors.accent500} />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.background,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
