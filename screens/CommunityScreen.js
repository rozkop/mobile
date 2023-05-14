import { useEffect, useState, useContext } from "react";

import ErrorOverlay from "../components/ui/overlays/ErrorOverlay";
import LoadingOverlay from "../components/ui/overlays/LoadingOverlay";
import PostsList from "../components/postsList/PostsList";
import Colors from "../constants/colors";
import CommunityHeader from "../components/CommunityHeader";
import SortBy from "../components/ui/SortBy";
import { AuthContext } from "../store/auth-context";
import { fetchCommunityData } from "../util/fetch";

function CommunityScreen({ route }) {
  const communitySlug = route.params.communitySlug;
  const communityId = route.params.communityId;
  const communityName = route.params.communityName;

  const [communityInfo, setCommunityInfo] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState();
  const [sortBy, setSortBy] = useState("hot");
  const [isMember, setIsMember] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getCommunity();
  }, [currentPage, sortBy]);

  async function getCommunity() {
    try {
      const community = await fetchCommunityData(
        communitySlug,
        sortBy,
        currentPage,
        authCtx.token
      );

      if (community.is_user_reacting !== null) {
        setIsMember(true);
      }

      if (community.posts.length !== 0) {
        setCommunityData(communityData.concat(community.posts));
        setCommunityInfo([community.community_name, community.description]);
      } else {
        setIsLastPage(true);
      }
    } catch (error) {
      setError("Could not fetch posts!");
      setIsFetching(false);
    }

    setIsFetching(false);
    setIsRefreshing(false);
    setIsLoading(false);
  }

  function clearFetchedPosts() {
    setCommunityData([]);
    setIsLastPage(false);
  }

  function refreshHandler() {
    clearFetchedPosts();
    setIsRefreshing(true);
    setIsFetching(true);
    if (currentPage === 1) {
      getCommunity();
    } else {
      setCurrentPage(1);
    }
  }

  function sortByHandler(sort) {
    clearFetchedPosts();
    setIsFetching(true);
    setSortBy(sort);

    if (sortBy === sort && currentPage === 1) {
      getCommunity();
    } else {
      setCurrentPage(1);
    }
  }

  function loadMoreHandler() {
    if (!isLoading && !isLastPage && !isRefreshing) {
      setCurrentPage(currentPage + 1);
      setIsLoading(true);
    }
  }

  function errorHandler() {
    setError(false);
    setIsFetching(true);
  }

  function selectedSortColor(sort) {
    if (sortBy === sort) {
      return Colors.accent500;
    } else {
      return Colors.grey500;
    }
  }

  if (error && !isFetching) {
    return (
      <ErrorOverlay
        message={error}
        onRefresh={errorHandler}
        refreshing={isRefreshing}
      />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <PostsList
      postsData={communityData}
      loadMoreHandler={loadMoreHandler}
      refreshHandler={refreshHandler}
      isLoading={isLoading}
      onCommunityScreen={true}
      communityId={communityId}
      communityName={communityName}
      communitySlug={communitySlug}
      ListHeaderComponent={
        <>
          <CommunityHeader
            name={communityInfo[0]}
            description={communityInfo[1]}
            display={!isRefreshing}
            communitySlug={communitySlug}
            isMember={isMember}
            setIsMember={setIsMember}
          />

          <SortBy
            sortBy={sortByHandler}
            selectedSortColor={selectedSortColor}
            display={!isRefreshing}
            disabled={isLoading}
          />
        </>
      }
    />
  );
}

export default CommunityScreen;
