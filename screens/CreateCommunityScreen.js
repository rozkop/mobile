import { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../constants/colors";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/auth-context";
import { createCommunity } from "../util/create";

function CreateCommunityScreen() {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [isSending, setIsSending] = useState(false);

  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  async function createNewCommunity(
    communityName,
    communityDescription,
    authToken
  ) {
    if (inputIsValid()) {
      setIsSending(true);

      try {
        await createCommunity(communityName, communityDescription, authToken);
        navigation.navigate("Home");
      } catch (error) {
        Alert.alert("Sorry, " + communityName + " is already taken.");
      }

      setIsSending(false);
    }
  }

  function inputIsValid() {
    if (communityName && communityDescription) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView>
          <TextInput
            style={styles.inputText}
            multiline={true}
            rows={2}
            onChangeText={(text) => setCommunityName(text)}
            value={communityName}
            placeholder="Community name (required)"
          />

          <TextInput
            style={styles.inputText}
            multiline={true}
            rows={10}
            onChangeText={(text) => setCommunityDescription(text)}
            value={communityDescription}
            placeholder="Description (required)"
          />
          <Button
            isDisabled={!inputIsValid()}
            additionalStyle={[
              styles.button,
              inputIsValid() ? styles.buttonCanSend : styles.buttonCantSend,
            ]}
            onPress={() => {
              !isSending &&
                createNewCommunity(
                  communityName,
                  communityDescription,
                  authCtx.token
                );
            }}
          >
            {isSending ? (
              <ActivityIndicator color={Colors.background} size="small" />
            ) : (
              "Create"
            )}
          </Button>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default CreateCommunityScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  inputText: {
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    textAlignVertical: "top",
    backgroundColor: Colors.background,
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
