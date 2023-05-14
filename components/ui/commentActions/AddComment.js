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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../../../constants/colors";
import Button from "../Button";
import FloatingButton from "../FloatingButton";
import { createComment } from "../../../util/create";
import { AuthContext } from "../../../store/auth-context";

function AddComment({ postTitle, postId, sendComment }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const authCtx = useContext(AuthContext);

  async function sendNewComment(postId, commentText, authToken) {
    if (inputIsValid()) {
      setIsSending(true);
    }

    const comment = await createComment(postId, commentText, authToken);
    sendComment(comment);

    cleanFields();
    setModalOpen(false);
    setIsSending(false);
  }

  function inputIsValid() {
    if (commentValue) {
      return true;
    } else {
      return false;
    }
  }

  function cleanFields() {
    setCommentValue("");
  }

  return (
    <>
      <Modal
        visible={modalOpen}
        animationType="slide"
        onRequestClose={() => {
          setModalOpen(false), setCommentValue("");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderContainer}>
            <Ionicons
              name="close"
              size={26}
              onPress={() => {
                setModalOpen(false), setCommentValue("");
              }}
            />
            <Text style={styles.modalHeaderText}>Add a comment</Text>
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{postTitle}</Text>
              </View>
              <TextInput
                style={styles.inputText}
                multiline={true}
                onChangeText={(text) => setCommentValue(text)}
                value={commentValue}
                placeholder="Your comment"
              />
              <Button
                isDisabled={!inputIsValid()}
                additionalStyle={[
                  styles.button,
                  inputIsValid() ? styles.buttonCanSend : styles.buttonCantSend,
                ]}
                onPress={() => {
                  !isSending &&
                    sendNewComment(postId, commentValue, authCtx.token);
                }}
              >
                {isSending ? (
                  <ActivityIndicator color={Colors.background} size="small" />
                ) : (
                  "Post"
                )}
              </Button>
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </View>
      </Modal>

      <FloatingButton name="comment" onPress={() => setModalOpen(true)} />
    </>
  );
}

export default AddComment;

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
  titleContainer: {
    marginTop: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    elevation: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "black",
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  modalHeaderText: {
    paddingLeft: 32,
    fontSize: 20,
    fontWeight: 500,
  },
  inputText: {
    marginHorizontal: 5,
    padding: 10,
    minHeight: 300,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 4,
    textAlignVertical: "top",
    backgroundColor: Colors.background,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 15,
  },
  buttonCanSend: {
    backgroundColor: Colors.accent500,
  },
  buttonCantSend: {
    backgroundColor: Colors.grey500,
  },
});
