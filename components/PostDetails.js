import { useState, useContext } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors";
import PostItem from "./postsList/PostItem";
import CommentsList from "./commentsList/CommentsList";
import AddComment from "./ui/commentActions/AddComment";
import ManagePost from "./ui/postActions/ManagePost";
import { AuthContext } from "../store/auth-context";
import { ScrollView } from "react-native-gesture-handler";
import { getFormattedDate } from "../util/date";

function PostDetails({
  postData,
  arrayPosition,
  postComments,
  isVisible,
  closeModal,
  numberOfComments,
  refreshScreen,
  onCommunityScreen,
}) {
  const [comments, setComments] = useState(postComments);
  const [isManageModalVisible, setIsManageModalVisible] = useState(false);

  const authCtx = useContext(AuthContext);

  function sendComment(comment) {
    setComments(comments.concat(comment));
    numberOfComments(arrayPosition, true);
  }

  function deleteComment(commentId) {
    setComments((comments) => comments.filter((item) => item.id !== commentId));
    numberOfComments(arrayPosition, false);
  }

  function openManageModal() {
    setIsManageModalVisible(true);
  }

  function closeManageModal() {
    setIsManageModalVisible(false);
  }

  function editOrDeletePost() {
    refreshScreen();
    setIsManageModalVisible(false);
    closeModal();
  }

  return (
    <>
      <Modal visible={isVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <View style={styles.modalHeaderContainer}>
              <Ionicons name="close" size={26} onPress={closeModal} />
              <Text style={styles.modalHeaderText}>Post</Text>
            </View>

            {postData.length !== 0 && (
              <PostItem
                postId={postData.id}
                communityName={postData.community_name}
                communityId={postData.community_id}
                communitySlug={postData.community_slug}
                authorId={
                  onCommunityScreen ? postData.user.id : postData.user_id
                }
                authorName={
                  onCommunityScreen ? postData.user.name : postData.user_name
                }
                title={postData.title}
                text={postData.text}
                date={
                  onCommunityScreen
                    ? getFormattedDate(new Date(postData.created_at))
                    : postData.date
                }
                rating={postData.rating}
                numberOfComments={comments.length}
                isPressable={false}
                charLimit={false}
                onCommunityPage={false}
                onPostScreen={true}
                openManageModal={openManageModal}
                onCommunityScreen={onCommunityScreen}
                closeDetailsModal={closeModal}
                detailModalOpen={true}
              />
            )}

            <CommentsList
              postId={postData.id}
              comments={comments}
              deleteSuccessful={deleteComment}
            />
          </ScrollView>
        </View>

        {authCtx.isAuthenticated && (
          <View>
            <AddComment
              postId={postData.id}
              postTitle={postData.title}
              sendComment={sendComment}
            />
          </View>
        )}

        <ManagePost
          postId={postData.id}
          postTitle={postData.title}
          postText={postData.text}
          isVisible={isManageModalVisible}
          closeModal={closeManageModal}
          editOrDeletePost={editOrDeletePost}
        />
      </Modal>
    </>
  );
}

export default PostDetails;

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
