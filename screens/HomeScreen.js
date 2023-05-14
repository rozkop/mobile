import { useEffect, useState, useContext } from "react";

import ErrorOverlay from "../components/ui/overlays/ErrorOverlay";
import LoadingOverlay from "../components/ui/overlays/LoadingOverlay";
import PostsList from "../components/postsList/PostsList";
import Colors from "../constants/colors";
import SortBy from "../components/ui/SortBy";
import { fetchPosts } from "../util/fetch";

function HomeScreen() {
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState();
  const [sortBy, setSortBy] = useState("hot");

  useEffect(() => {
    getPosts();
  }, [currentPage, sortBy]);

  async function getPosts() {
    try {
      const posts = await fetchPosts(sortBy, currentPage);

      if (posts.length !== 0) {
        setFetchedPosts((fetchedPosts) => fetchedPosts.concat(posts));
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
    setFetchedPosts([]);
    setIsLastPage(false);
  }

  function refreshHandler() {
    clearFetchedPosts();
    setIsRefreshing(true);
    setIsFetching(true);
    if (currentPage === 1) {
      getPosts();
    } else {
      setCurrentPage(1);
    }
  }

  function sortByHandler(sort) {
    clearFetchedPosts();
    setIsFetching(true);
    setSortBy(sort);
    if (sortBy === sort && currentPage === 1) {
      getPosts();
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
      postsData={fetchedPosts}
      loadMoreHandler={loadMoreHandler}
      refreshHandler={refreshHandler}
      isLoading={isLoading}
      ListHeaderComponent={
        <SortBy
          sortBy={sortByHandler}
          selectedSortColor={selectedSortColor}
          display={!isRefreshing}
          disabled={isLoading}
        />
      }
    />
  );
}

export default HomeScreen;
