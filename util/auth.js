import { Alert } from "react-native";
import axios from "axios";

import { API_URL } from "@env";

export async function createUser(email, name, password, confirmPassword) {
  const response = await axios.post(API_URL + "/register", {
    email: email,
    name: name,
    password: password,
    password_confirmation: confirmPassword,
  });

  return response.data.data;
}

export async function login(email, password) {
  let userData = null;

  try {
    const response = await axios.post(API_URL + "/login", {
      email: email,
      password: password,
    });

    if (response.data.data.error === "Invalid email or password!") {
      Alert.alert(
        "Incorrect username or password.",
        "Could not log you in. Please check your credentials and try again."
      );
    } else {
      userData = response.data.data;
    }
  } catch (error) {}

  return userData;
}

export async function logout(authToken) {
  await axios.post(
    API_URL + "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
}
