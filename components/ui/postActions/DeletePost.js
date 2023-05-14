import { useContext, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";

import Colors from "../../../constants/colors";
import Button from "../Button";
import { AuthContext } from "../../../store/auth-context";
import { deletePost } from "../../../util/delete";

function DeletePost({ isVisible, closeModal, postId, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const authCtx = useContext(AuthContext);

  async function deletePostHandler(postId, authToken) {
    setIsDeleting(true);

    await deletePost(postId, authToken);
    onSuccess();

    setIsDeleting(false);
  }

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.4}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Are you sure?</Text>
          <Text style={styles.additionalText}>
            You cannot restore deleted posts.
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          {!isDeleting ? (
            <>
              <Button
                onPress={closeModal}
                additionalStyle={styles.cancelButton}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  deletePostHandler(postId, authCtx.token);
                }}
                additionalStyle={styles.deleteButton}
              >
                Delete
              </Button>
            </>
          ) : (
            <ActivityIndicator color={Colors.danger500} size="large" />
          )}
        </View>
      </View>
    </Modal>
  );
}

export default DeletePost;

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
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: Colors.grey500,
  },
  deleteButton: {
    backgroundColor: Colors.danger500,
  },
});
