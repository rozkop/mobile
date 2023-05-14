import { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors";
import { AuthContext } from "../store/auth-context";
import { joinCommunity } from "../util/join";

function CommunityHeader({
  name,
  description,
  display,
  communitySlug,
  isMember,
  setIsMember,
}) {
  const authCtx = useContext(AuthContext);

  async function communityLiked() {
    await joinCommunity(communitySlug, authCtx.token);
  }

  return (
    <>
      {display && (
        <View style={styles.container}>
          <View style={styles.insideContainer}>
            <View>
              <Text style={styles.nameText}>{name}</Text>
            </View>
            <Pressable
              android_ripple={{ color: Colors.member50 }}
              onPress={() => {
                communityLiked(), setIsMember(true);
              }}
              disabled={!authCtx.isAuthenticated || isMember}
            >
              <View
                style={[
                  styles.joinContainer,
                  isMember ? styles.memberStar : styles.notMemberStar,
                ]}
              >
                <Ionicons
                  name="star"
                  color={isMember ? Colors.member : Colors.grey500}
                  size={25}
                />
              </View>
            </Pressable>
          </View>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      )}
    </>
  );
}

export default CommunityHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
  },
  insideContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  joinContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 0.8,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  joinText: {
    marginRight: 5,
    fontSize: 18,
    fontWeight: "500",
    color: Colors.grey500,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  membersText: {
    color: Colors.grey500,
  },
  descriptionText: {
    marginTop: 10,
  },
  notMemberStar: {
    borderColor: Colors.grey500,
  },
  memberStar: {
    borderColor: Colors.member,
  },
});
