import { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import DeleteComment from "../ui/commentActions/DeleteComment";
import PostActionButton from "../ui/PostActionButton";
import { AuthContext } from "../../store/auth-context";
import { getFormattedDate } from "../../util/date";

function CommentItem({
  postId,
  commentId,
  authorId,
  author,
  text,
  rating,
  date,
  deleteSuccessful,
}) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setIsAuthor(authCtx.isAuthor(authorId));
  }, []);

  function openDeleteModal() {
    setIsDeleteModalVisible(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.authorContainer}>
          <Text style={styles.authorText}>{author} </Text>
          <Text>| {getFormattedDate(new Date(date))}</Text>
        </View>
        <Text>{text}</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsContainer}>
            <MaterialCommunityIcons
              name="arrow-up-bold-outline"
              color="grey"
              size={25}
            />
            <Text style={styles.statsText}>{rating === null ? 0 : rating}</Text>
            <MaterialCommunityIcons
              name="arrow-down-bold-outline"
              color="grey"
              size={25}
            />
            {isAuthor && (
              <View style={styles.deleteIcon}>
                <PostActionButton
                  style={{ marginLeft: 50 }}
                  onPress={openDeleteModal}
                >
                  <MaterialCommunityIcons
                    name="delete-outline"
                    color="grey"
                    size={25}
                  />
                </PostActionButton>
              </View>
            )}
          </View>
        </View>
      </View>

      <DeleteComment
        isVisible={isDeleteModalVisible}
        closeModal={closeDeleteModal}
        postId={postId}
        commentId={commentId}
        deletedComment={deleteSuccessful}
      />
    </>
  );
}

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    marginVertical: 5,
    marginLeft: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.background,
    elevation: 3,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  statsText: {
    fontSize: 15,
  },
  deleteIcon: {
    marginLeft: 30,
  },
});
