import { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";

import Colors from "../../../constants/colors";
import Footer from "../Footer";
import { fetchCommunities } from "../../../util/fetch";

function ChangeCommunity({ onInputChanged, isVisible, closeModal }) {
  const [data, setData] = useState([]);

  const [selected, setSelected] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isVisible) {
      getCommunities();
    }
  }, [isVisible]);

  async function getCommunities() {
    setIsFetching(true);

    const communities = await fetchCommunities();
    setData(communities);

    setIsFetching(false);
  }

  function setCommunity() {
    onInputChanged(selected);
    closeModal();
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeaderContainer}>
          <Ionicons name="close" size={26} onPress={closeModal} />
          <Text style={styles.modalHeaderText}>Choose community</Text>
        </View>
        {isFetching ? (
          <View style={styles.container}>
            <Footer />
          </View>
        ) : (
          <SelectList
            data={data}
            onSelect={() => setCommunity()}
            setSelected={setSelected}
            save="key"
            boxStyles={styles.select}
            dropdownStyles={styles.selectDropdown}
            dropdownItemStyles={styles.selectItem}
            placeholder="Select community"
            notFoundText="Can't find community with that name"
            closeicon={<Ionicons name="close" size={20} />}
            arrowicon={<Ionicons name="chevron-down" size={20} />}
          />
        )}
      </View>
    </Modal>
  );
}

export default ChangeCommunity;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: Colors.background,
    elevation: 4,
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    margin: 5,
    backgroundColor: Colors.background,
    borderWidth: 0,
    elevation: 4,
  },
  selectDropdown: {
    marginHorizontal: 5,
    backgroundColor: Colors.background,
    borderWidth: 0,
    elevation: 4,
  },
  selectItem: {
    marginHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey500,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  modalHeaderContainer: {
    paddingTop: 15,
    paddingBottom: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  communityContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  modalHeaderText: {
    paddingLeft: 32,
    fontSize: 20,
    fontWeight: 500,
  },
  inputText: {
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 10,
    // minHeight: 50,
    borderRadius: 8,
    elevation: 4,
    textAlignVertical: "top",
    backgroundColor: Colors.background,
  },
  communityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 15,
  },
  buttonCanSend: {
    backgroundColor: Colors.accent500,
  },
  buttonCantSend: {
    backgroundColor: Colors.grey500,
  },
});
