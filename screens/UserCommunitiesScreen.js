import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import LoadingOverlay from "../components/ui/overlays/LoadingOverlay";
import Colors from "../constants/colors";
import CommunityItem from "../components/communitiesList/CommunityItem";
import { AuthContext } from "../store/auth-context";
import { fetchUserData } from "../util/fetch";

function UserCommunitiesScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userOwnedCommunities, setUserOwnedCommunities] = useState([]);
  const [userLikedCommunities, setUserLikedCommunities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [fromLikedCommunities, setFromLikedCommunities] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    async function getCommunities() {
      setIsRefreshing(false);
      setIsFetching(true);

      const response = await fetchUserData(authCtx.token);

      setUserOwnedCommunities(response.data.user_communities);
      setUserLikedCommunities(response.data.user_liked_communities);

      setIsFetching(false);
    }

    getCommunities();
  }, [isRefreshing]);

  function navigateToCommunity(communityId, communityName, communitySlug) {
    navigation.navigate("Community", {
      communityId: communityId,
      communityName: communityName,
      communitySlug: communitySlug,
    });
  }

  function refreshHandler() {
    setIsRefreshing(true);
  }

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setFromLikedCommunities(false);
    setModalData([]);
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  function renderCommunityItem(itemData) {
    return (
      <CommunityItem
        itemData={itemData}
        fromLikedCommunities={fromLikedCommunities}
        navigateToCommunity={navigateToCommunity}
        closeModal={closeModal}
      />
    );
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
        <Pressable
          android_ripple={Colors.ripple}
          onPress={() => {
            openModal(), setModalData(userOwnedCommunities);
          }}
        >
          <View style={[styles.userInfoContainer, styles.userStatsContainer]}>
            <Text style={styles.text}>Your communities</Text>
          </View>
        </Pressable>

        <Pressable
          android_ripple={Colors.ripple}
          onPress={() => {
            openModal(),
              setModalData(userLikedCommunities),
              setFromLikedCommunities(true);
          }}
        >
          <View style={[styles.userInfoContainer, styles.userStatsContainer]}>
            <Text style={styles.text}>Communities that you like</Text>
          </View>
        </Pressable>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalHeaderContainer}>
          <Ionicons name="close" size={26} onPress={closeModal} />
        </View>
        {modalData.length !== 0 ? (
          <FlatList
            data={modalData}
            renderItem={renderCommunityItem}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : (
          <Text style={[styles.text, styles.noCommunitiesFound]}>
            No communities to show
          </Text>
        )}
      </Modal>
    </>
  );
}

export default UserCommunitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 5,
  },
  modalHeaderContainer: {
    paddingTop: 15,
    paddingBottom: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoContainer: {
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.background,
    elevation: 4,
  },
  text: {
    fontSize: 20,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  noCommunitiesFound: {
    alignSelf: "center",
  },
});
