import { View, Text, StyleSheet, RefreshControl } from "react-native";

import Colors from "../../../constants/colors";

function ErrorOverlay({ message, onRefresh, refreshing }) {
  return (
    <RefreshControl
      style={styles.container}
      onRefresh={onRefresh}
      refreshing={refreshing}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.title]}>An error occurred!</Text>
        <Text style={styles.text}>{message}</Text>
      </View>
    </RefreshControl>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
