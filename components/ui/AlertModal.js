import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import Colors from "../../constants/colors";
import Button from "./Button";

function AlertModal({ message, additional, isVisible, closeModal }) {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.4}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{message}</Text>
          <Text style={styles.additionalText}>{additional}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={closeModal} additionalStyle={styles.button}>
            Ok
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export default AlertModal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
    color: Colors.text,
  },
  additionalText: {
    fontSize: 18,
    color: Colors.text,
  },
  textContainer: {
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 15,
  },
});
