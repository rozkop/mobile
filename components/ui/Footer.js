import { View, ActivityIndicator, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function Footer() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator
        size="large"
        color={Colors.accent500}
      ></ActivityIndicator>
    </View>
  );
}

export default Footer;

const styles = StyleSheet.create({
  loader: {
    marginVertical: 10,
  },
});
