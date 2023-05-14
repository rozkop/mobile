import { useContext, useState } from "react";
import { FlatList } from "react-native";

import PostItem from "./PostItem";
import AddPost from "../ui/postActions/AddPost";
import PostDetails from "../PostDetails";
import LoadingOverlay from "../ui/overlays/LoadingOverlay";
import Footer from "../ui/Footer";
import { AuthContext } from "../../store/auth-context";
import { fetchPost } from "../../util/fetch";
import { getFormattedDate } from "../../util/date";

function PostsList({
  postsData,
  loadMoreHandler,
  refreshHandler,
  communityId,
  communityName,
  communitySlug,
  ListHeaderComponent,
  isLoading,
  onCommunityScreen,
}) {
  const [isDetailsModalVisible, setIsDetailModalVisible] = useState(false);
  const [fetchedPosts, setFetchedPosts] = useState(postsData);
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [postData, setPostData] = useState("");
  const [postComments, setPostComments] = useState([]);

  const authCtx = useContext(AuthContext);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  async function openDetailsModal(postId) {
    setIsDetailModalVisible(true);
    setIsFetching(true);

    const response = await fetchPost(postId);
    setPostComments(response.Comments);

    setIsFetching(false);
  }

  function closeDetailsModal() {
    setPostData("");
    setPostComments("");
    setIsDetailModalVisible(false);
  }

  function commentsNumber(id, add) {
    const updatedItems = [...fetchedPosts];
    const itemIndex = updatedItems.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const updatedItem = { ...updatedItems[itemIndex] };

      if (add) {
        updatedItem.comments += 1;
      } else {
        updatedItem.comments -= 1;
      }

      updatedItems[itemIndex] = updatedItem;
      setFetchedPosts([...updatedItems]);
    }
  }

  function renderPostItem(itemData) {
    return (
      <PostItem
        postId={itemData.item.id}
        communityName={itemData.item.community_name}
        communityId={itemData.item.community_id}
        communitySlug={itemData.item.community_slug}
        authorName={
          onCommunityScreen ? itemData.item.user.name : itemData.item.user_name
        }
        authorId={
          onCommunityScreen ? itemData.item.user.id : itemData.item.user_id
        }
        title={itemData.item.title}
        text={itemData.item.text}
        date={
          onCommunityScreen
            ? getFormattedDate(new Date(itemData.item.created_at))
            : itemData.item.date
        }
        numberOfComments={
          onCommunityScreen
            ? itemData.item.count_comments
            : itemData.item.comments
        }
        onPress={() => {
          openDetailsModal(itemData.item.id);
          setPostData(itemData.item);
        }}
        isPressable={true}
        charLimit={true}
        rating={itemData.item.rating}
        onCommunityScreen={onCommunityScreen}
      />
    );
  }

  return (
    <>
      <FlatList
        data={fetchedPosts}
        extraData={postComments}
        renderItem={renderPostItem}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={loadMoreHandler}
        onEndReachedThreshold={0.05}
        refreshing={isRefreshing}
        onRefresh={refreshHandler}
        ListFooterComponent={
          <>
            {isLoading ? (
              <Footer />
            ) : (
              <>
                <PostDetails
                  isVisible={isDetailsModalVisible}
                  closeModal={closeDetailsModal}
                  postData={postData}
                  arrayPosition={fetchedPosts.indexOf(postData)}
                  postComments={postComments}
                  numberOfComments={commentsNumber}
                  refreshScreen={refreshHandler}
                  onCommunityScreen={onCommunityScreen}
                />
              </>
            )}
          </>
        }
        ListHeaderComponent={ListHeaderComponent}
      />
      {authCtx.isAuthenticated && (
        <AddPost
          communityId={communityId}
          communityName={communityName}
          communitySlug={communitySlug}
          onSuccess={() => {
            refreshHandler(), setIsFetching(true);
          }}
        />
      )}
    </>
  );
}

export default PostsList;
