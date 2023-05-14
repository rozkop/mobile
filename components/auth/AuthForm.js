import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";
import Colors from "../../constants/colors";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    name: nameIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "name":
        setEnteredName(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      name: enteredName,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{isLogin ? "Log In" : "Sign Up"}</Text>
      </View>
      <View>
        <Input
          label="E-mail Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Name"
            onUpdateValue={updateInputValueHandler.bind(this, "name")}
            value={enteredName}
            isInvalid={nameIsInvalid}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 8,
  },
  textContainer: {
    alignItems: "center",
  },
  buttonCanSend: {
    backgroundColor: Colors.accent500,
  },
  buttonCantSend: {
    backgroundColor: Colors.grey500,
  },
});
