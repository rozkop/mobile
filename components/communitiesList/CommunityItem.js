import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../../constants/colors";
import { getFormattedDate } from "../../util/date";

function CommunityItem({
  itemData,
  fromLikedCommunities,
  navigateToCommunity,
  closeModal,
}) {
  let rating = 0;

  if (fromLikedCommunities) {
    rating = JSON.parse(itemData.item.rating);
    rating = rating.like;
  }

  return (
    <Pressable
      android_ripple={Colors.ripple}
      onPress={() => {
        closeModal(),
          navigateToCommunity(
            itemData.item.id,
            itemData.item.name,
            itemData.item.slug
          );
      }}
    >
      <View style={styles.container}>
        <View style={styles.communityInfoContainer}>
          <Text style={styles.topText}>
            Created: {getFormattedDate(new Date(itemData.item.created_at))}
          </Text>
          <Text style={styles.topText}>
            Users: {fromLikedCommunities ? rating : itemData.item.rating}
          </Text>
          <Text style={styles.nameText}>{itemData.item.name}</Text>
          <Text style={styles.descriptionText}>
            {itemData.item.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default CommunityItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  topText: {
    fontSize: 15,
    color: Colors.grey500,
  },
  communityInfoContainer: {
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    elevation: 4,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 20,
    alignSelf: "flex-start",
  },
});
