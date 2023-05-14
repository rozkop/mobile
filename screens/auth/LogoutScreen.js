import { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/ui/Button";
import Colors from "../../constants/colors";
import { AuthContext } from "../../store/auth-context";
import { LoadingOverlay } from "../../components/ui/overlays/LoadingOverlay";
import { logout } from "../../util/auth";

function LogoutScreen() {
  const authCtx = useContext(AuthContext);
  const [isLoggingOut, setisLoggingOut] = useState(false);
  const navigation = useNavigation();

  async function logoutHandler() {
    setisLoggingOut(true);
    authCtx.logout();

    try {
      const response = await logout(authCtx.token);
    } catch (error) {}

    setisLoggingOut(false);
  }

  if (isLoggingOut) {
    return <LoadingOverlay message="Logging you out..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Log out from rozkop?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={logoutHandler}>Log Out</Button>
        <Button
          additionalStyle={styles.cancelButton}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
}

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
    elevation: 4,
  },
  buttonContainer: {
    marginTop: 10,
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
  },
  button: {
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: Colors.grey500,
    padding: 150,
  },
});
