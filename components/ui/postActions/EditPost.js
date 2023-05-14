import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../../../constants/colors";
import Button from "../Button";
import { AuthContext } from "../../../store/auth-context";
import { editPost } from "../../../util/edit";

function EditPost({
  isVisible,
  closeModal,
  postId,
  postTitle,
  postText,
  onSuccess,
}) {
  const [idValue, setIdValue] = useState(postId);
  const [titleValue, setTitleValue] = useState(postTitle);
  const [textValue, setTextValue] = useState(postText);

  const [isSending, setIsSending] = useState(false);

  const authCtx = useContext(AuthContext);

  async function editPostHandler(postId, postTitle, postText, authToken) {
    if (inputIsValid()) {
      setIsSending(true);

      await editPost(postId, postTitle, postText, authToken);

      onSuccess();
      setIsSending(false);
    } else {
      Alert.alert("Fields can't be empty!");
    }
  }

  function inputIsValid() {
    if (textValue && titleValue) {
      return true;
    } else {
      return false;
    }
  }

  function setDefaultValue() {
    setTextValue(postText);
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeaderContainer}>
          <Ionicons
            name="close"
            size={26}
            onPress={() => {
              closeModal(), setDefaultValue();
            }}
          />
          <Text style={styles.modalHeaderText}>Edit post</Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAwareScrollView>
            <View style={styles.communityContainer}>
              <Text style={styles.communityText}>{titleValue}</Text>
            </View>
            <TextInput
              style={styles.inputText}
              multiline={true}
              rows={10}
              onChangeText={(text) => setTextValue(text)}
              value={textValue}
              placeholder="Your post text (required)"
            />
            <Button
              isDisabled={!inputIsValid()}
              additionalStyle={[
                styles.button,
                inputIsValid() ? styles.buttonCanSend : styles.buttonCantSend,
              ]}
              onPress={() => {
                inputIsValid() &&
                  editPostHandler(
                    idValue,
                    titleValue,
                    textValue,
                    authCtx.token
                  );
              }}
            >
              {isSending ? (
                <ActivityIndicator color={Colors.background} size="small" />
              ) : (
                "Edit"
              )}
            </Button>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

export default EditPost;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  modalHeaderContainer: {
    paddingTop: 15,
    paddingBottom: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  communityContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  modalHeaderText: {
    paddingLeft: 32,
    fontSize: 20,
    fontWeight: 500,
  },
  inputText: {
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    textAlignVertical: "top",
    backgroundColor: Colors.background,
  },
  communityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 15,
  },
  buttonCanSend: {
    backgroundColor: Colors.primary,
  },
  buttonCantSend: {
    backgroundColor: Colors.grey500,
  },
});
