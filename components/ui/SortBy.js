import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Button from "./Button";
import Colors from "../../constants/colors";

function SortBy({ sortBy, selectedSortColor, display, disabled }) {
  function sortByHot() {
    sortBy("hot");
  }

  function sortByNew() {
    sortBy("new");
  }
  return (
    <>
      {display && (
        <>
          <Text style={styles.sortText}>Sort by</Text>
          <View style={styles.sortContainer}>
            <Button
              additionalStyle={{
                marginRight: 10,
                backgroundColor: selectedSortColor("hot"),
              }}
              onPress={sortByHot}
              isDisabled={disabled}
            >
              <View style={styles.buttonContainer}>
                <MaterialIcons
                  name="whatshot"
                  size={25}
                  color={Colors.background}
                />
                <Text style={styles.text}>Hot</Text>
              </View>
            </Button>

            <Button
              additionalStyle={{
                marginRight: 10,
                backgroundColor: selectedSortColor("new"),
              }}
              onPress={sortByNew}
              isDisabled={disabled}
            >
              <View style={styles.buttonContainer}>
                <MaterialIcons
                  name="new-releases"
                  size={25}
                  color={Colors.background}
                />
                <Text style={styles.text}>New</Text>
              </View>
            </Button>
          </View>
        </>
      )}
    </>
  );
}

export default SortBy;

const styles = StyleSheet.create({
  sortContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sortText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 5,
  },
  text: {
    paddingLeft: 5,
    color: Colors.background,
  },
});
