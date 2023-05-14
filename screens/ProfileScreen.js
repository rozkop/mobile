import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";

import LoadingOverlay from "../components/ui/overlays/LoadingOverlay";
import Colors from "../constants/colors";
import { AuthContext } from "../store/auth-context";
import { fetchUserData } from "../util/fetch";

function ProfileScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userData, setUserData] = useState([]);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      setIsRefreshing(false);
      setIsFetching(true);

      const response = await fetchUserData(authCtx.token);
      setUserData(response.data);

      setIsFetching(false);
    }

    fetchData();
  }, [isRefreshing]);

  function refreshHandler() {
    setIsRefreshing(true);
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshHandler}
          />
        }
      >
        <View style={styles.userInfoContainer}>
          <Text style={[styles.nameText, styles.boldText]}>
            {userData.user.name}
          </Text>
          <Text style={styles.userInfoText}>{userData.user.email}</Text>
        </View>

        <View style={[styles.userInfoContainer, styles.userStatsContainer]}>
          <Text style={styles.userStatsText}>Number of posts:</Text>
          <Text style={[styles.userStatsText, styles.boldText]}>
            {userData.user_posts.length}
          </Text>
        </View>
        <View style={[styles.userInfoContainer, styles.userStatsContainer]}>
          <Text style={styles.userStatsText}>Number of communities:</Text>
          <Text style={[styles.userStatsText, styles.boldText]}>
            {userData.user_communities.length}
          </Text>
        </View>
        <View style={[styles.userInfoContainer, styles.userStatsContainer]}>
          <Text style={styles.userStatsText}>Liked posts:</Text>
          <Text style={[styles.userStatsText, styles.boldText]}>
            {userData.user_liked_posts.length}
          </Text>
        </View>
        <View style={[styles.userInfoContainer, styles.userStatsContainer]}>
          <Text style={styles.userStatsText}>Joined communities:</Text>
          <Text style={[styles.userStatsText, styles.boldText]}>
            {userData.user_liked_communities.length}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 5,
  },
  userInfoContainer: {
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: Colors.background,
    elevation: 4,
  },
  userStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: 24,
    alignSelf: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  userInfoText: {
    fontSize: 20,
  },
  userStatsText: {
    fontSize: 20,
    alignSelf: "flex-start",
  },
});
