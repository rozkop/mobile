import { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";

import AuthForm from "./AuthForm";
import Colors from "../../constants/colors";
import AlertModal from "../ui/AlertModal";

function AuthContent({ isLogin, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    name: false,
    password: false,
    confirmPassword: false,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  function closeModal() {
    setModalVisible(false);
  }

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, name, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    let username = name;
    let usernameWithoutSpace = username.replace(/ /g, "");

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 7;
    const nameIsInvalid = usernameWithoutSpace.length <= 0;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (nameIsInvalid || !passwordsAreEqual))
    ) {
      setModalVisible(true);
      setCredentialsInvalid({
        email: !emailIsValid,
        name: nameIsInvalid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, name, password, confirmPassword });
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView>
          <View style={styles.authContent}>
            <AuthForm
              isLogin={isLogin}
              onSubmit={submitHandler}
              credentialsInvalid={credentialsInvalid}
            />
            <View style={styles.buttons}>
              <Text style={styles.infoText}>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
              </Text>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={switchAuthModeHandler}
              >
                <Text style={styles.infoUnderlineText}>
                  {isLogin ? "Sign Up" : "Log In"}
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable>
            <View style={[styles.authContent, styles.githubContent]}>
              <View style={styles.githubLogo}>
                <Ionicons name="logo-github" size={25} />
              </View>
              <Text>Continue with GitHub</Text>
            </View>
          </Pressable>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <AlertModal
        isVisible={modalVisible}
        closeModal={closeModal}
        message={"Invalid input"}
        additional={"Please check your entered credentials."}
      />
    </>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginVertical: 15,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
    elevation: 4,
  },
  githubContent: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  githubLogo: {
    paddingRight: 25,
  },
  buttons: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    color: Colors.text,
  },
  infoUnderlineText: {
    color: Colors.accent500,
    textDecorationLine: "underline",
  },
  pressed: {
    opacity: 0.7,
  },
});
