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
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../../../constants/colors";
import Button from "../Button";
import FloatingButton from "../FloatingButton";
import ChangeCommunity from "./ChangeCommunity";
import { createPost } from "../../../util/create";
import { AuthContext } from "../../../store/auth-context";

function AddPost({ communityId, communityName, communitySlug, onSuccess }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [chosenCommunityName, setChosenCommunityName] = useState(communityName);
  const [chosenCommunityId, setChosenCommunityId] = useState(communityId);
  const [chosenCommunitySlug, setChosenCommunitySlug] = useState(communitySlug);
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isCommunityModalVisible, setCommunityModalVisible] = useState(false);

  const authCtx = useContext(AuthContext);

  async function sendNewPost() {
    if (inputIsValid()) {
      setIsSending(true);

      await createPost(
        chosenCommunitySlug,
        titleValue,
        textValue,
        authCtx.token
      );

      onSuccess();
      cleanFields();
      setModalOpen(false);
      setIsSending(false);
    }
  }

  function inputIsValid() {
    if (textValue && titleValue && chosenCommunitySlug) {
      return true;
    } else {
      return false;
    }
  }

  function cleanFields() {
    setTextValue("");
    setTitleValue("");
    setChosenCommunitySlug(communitySlug);
  }

  function openCommunityModal() {
    setCommunityModalVisible(true);
  }

  function closeCommunityModal() {
    setCommunityModalVisible(false);
  }

  function changeCommunity(chosenCommunity) {
    setChosenCommunityId(chosenCommunity[0]);
    setChosenCommunitySlug(chosenCommunity[1]);
  }

  return (
    <>
      <Modal
        visible={modalOpen}
        animationType="slide"
        onRequestClose={() => {
          setModalOpen(false), cleanFields();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderContainer}>
            <Ionicons
              name="close"
              size={26}
              onPress={() => {
                setModalOpen(false), cleanFields();
              }}
            />
            <Text style={styles.modalHeaderText}>Add new post</Text>
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView>
              <Pressable onPress={openCommunityModal}>
                <View style={styles.communityContainer}>
                  <Text style={styles.communityText}>
                    {chosenCommunitySlug
                      ? chosenCommunitySlug
                      : "Choose community"}
                  </Text>
                </View>
              </Pressable>
              <TextInput
                style={styles.inputText}
                multiline={true}
                rows={2}
                onChangeText={(text) => setTitleValue(text)}
                value={titleValue}
                placeholder="Title (required)"
              />

              <TextInput
                style={styles.inputText}
                multiline={true}
                rows={5}
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
                  !isSending && sendNewPost();
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

      <ChangeCommunity
        isVisible={isCommunityModalVisible}
        closeModal={closeCommunityModal}
        onInputChanged={changeCommunity}
      />

      <FloatingButton name="pencil" onPress={() => setModalOpen(true)} />
    </>
  );
}

export default AddPost;

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
    backgroundColor: Colors.accent500,
  },
  buttonCantSend: {
    backgroundColor: Colors.grey500,
  },
});
