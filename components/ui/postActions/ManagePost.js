import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import Colors from "../../../constants/colors";
import ManageOptionItem from "../ManageOptionItem";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

function ManagePost({
  isVisible,
  closeModal,
  postId,
  postTitle,
  postText,
  editOrDeletePost,
}) {
  const [idValue, setIdValue] = useState(postId);
  const [titleValue, setTitleValue] = useState(postTitle);
  const [textValue, setTextValue] = useState(postText);

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  function openEditModal() {
    setEditModalVisible(true);
  }

  function closeEditModal() {
    setEditModalVisible(false);
  }

  function openDeleteModal() {
    setDeleteModalVisible(true);
  }

  function closeDeleteModal() {
    setDeleteModalVisible(false);
  }

  return (
    <>
      <Modal
        visible={isVisible}
        animationType="slide"
        onBackdropPress={() => {
          closeModal();
        }}
        style={styles.modalContainer}
      >
        <View style={styles.modalInnerContainer}>
          <ManageOptionItem
            iconName="square-edit-outline"
            optionText="Edit"
            onPress={() => openEditModal()}
            color={Colors.primary}
          />

          <ManageOptionItem
            iconName="delete-outline"
            optionText="Delete"
            onPress={() => openDeleteModal()}
            color={Colors.danger500}
          />
        </View>
      </Modal>

      <EditPost
        isVisible={isEditModalVisible}
        closeModal={() => closeEditModal()}
        postId={idValue}
        postTitle={titleValue}
        postText={textValue}
        onSuccess={() => {
          closeEditModal(), editOrDeletePost();
        }}
      />

      <DeletePost
        isVisible={isDeleteModalVisible}
        closeModal={() => closeDeleteModal()}
        postId={idValue}
        onSuccess={() => {
          editOrDeletePost(), closeDeleteModal();
        }}
      />
    </>
  );
}

export default ManagePost;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalInnerContainer: {
    paddingTop: 18,
    paddingBottom: 12,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: Colors.grey500Rgba,
  },
});
