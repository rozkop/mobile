import { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../constants/colors";
import PostActionButton from "../ui/PostActionButton";
import AlertModal from "../ui/AlertModal";
import { AuthContext } from "../../store/auth-context";
import { limitCharacters } from "../../util/limitCharacters";
import { createReport } from "../../util/create";

function PostItem({
  postId,
  communityName,
  communityId,
  communitySlug,
  authorId,
  authorName,
  title,
  text,
  date,
  rating,
  numberOfComments,
  onPress,
  isPressable,
  charLimit,
  onCommunityScreen,
  onPostScreen,
  openManageModal,
  closeDetailsModal,
  detailModalOpen,
}) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setIsAuthor(authCtx.isAuthor(authorId));
  }, []);

  async function reportPost(postId, authToken) {
    setIsSending(true);

    await createReport(postId, authToken);
    setIsReportModalVisible(true);

    setIsSending(false);
  }

  function pressHandler() {
    if (detailModalOpen) {
      closeDetailsModal();
    }
    navigation.navigate("Community", {
      communityId: communityId,
      communityName: communityName,
      communitySlug: communitySlug,
    });
  }

  function closeReportModal() {
    setIsReportModalVisible(false);
  }

  return (
    <>
      <View style={styles.container}>
        <Pressable
          android_ripple={{ color: Colors.ripple }}
          disabled={!isPressable}
          onPress={onPress}
        >
          <View style={styles.innerContainer}>
            <View>
              {!onCommunityScreen && (
                <View style={styles.communityContainer}>
                  <Pressable
                    android_ripple={{ color: Colors.ripple }}
                    onPress={pressHandler}
                  >
                    <Text style={styles.communityText}>c/{communityName}</Text>
                  </Pressable>
                </View>
              )}
              <View style={styles.authorContainer}>
                <Text>{authorName} </Text>
                <Text>| {date}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{title}</Text>
              <Text>
                {text !== undefined && limitCharacters(text, charLimit)}
              </Text>
            </View>
            <View style={[styles.buttonsContainer, styles.actionsContainer]}>
              <View style={styles.buttonsContainer}>
                <MaterialCommunityIcons
                  name="arrow-up-bold-outline"
                  color={Colors.grey500}
                  size={25}
                />
                <Text style={styles.statsText}> {rating} </Text>
                <MaterialCommunityIcons
                  name="arrow-down-bold-outline"
                  color={Colors.grey500}
                  size={25}
                />
              </View>
              <PostActionButton disabled={!isPressable} onPress={onPress}>
                <View style={styles.buttonsContainer}>
                  <Octicons name="comment" color={Colors.grey500} size={20} />
                  <Text style={styles.statsText}> {numberOfComments}</Text>
                </View>
              </PostActionButton>
              {!isAuthor && authCtx.isAuthenticated && (
                <PostActionButton
                  disabled={isSending}
                  onPress={() => {
                    reportPost(postId, authCtx.token);
                  }}
                >
                  <Ionicons name="flag" color={Colors.grey500} size={25} />
                </PostActionButton>
              )}
              {onPostScreen && (
                <>
                  {isAuthor && (
                    <PostActionButton onPress={openManageModal}>
                      <Entypo
                        name="dots-three-vertical"
                        color={Colors.grey500}
                        size={21}
                      />
                    </PostActionButton>
                  )}
                </>
              )}
            </View>
          </View>
        </Pressable>
      </View>

      <AlertModal
        isVisible={isReportModalVisible}
        closeModal={closeReportModal}
        message={"Post reported!"}
      />
    </>
  );
}

export default PostItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 8,
    backgroundColor: Colors.background,
    elevation: 4,
  },
  innerContainer: {
    padding: 10,
  },
  textContainer: {
    marginTop: 2,
  },
  authorContainer: {
    flexDirection: "row",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 40,
  },
  actionsContainer: {
    marginTop: 10,
  },
  communityContainer: {
    alignSelf: "flex-start",
  },
  communityText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statsText: {
    fontSize: 15,
  },
  pressable: {
    opacity: 0.7,
  },
});
