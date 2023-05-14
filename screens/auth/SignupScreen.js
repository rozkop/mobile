import { useContext, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthContent from "../../components/auth/AuthContent";
import LoadingOverlay from "../../components/ui/overlays/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import { createUser } from "../../util/auth";

function SignupScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, name, password, confirmPassword }) {
    setIsAuthenticating(true);
    try {
      const userData = await createUser(email, name, password, confirmPassword);

      authCtx.authenticate(userData);

      if (userData != null) {
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert(
        "Could not create an account.",
        "Please check your entries and try again."
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Signing you up..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
