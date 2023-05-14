import { useState, useContext } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthContent from "../../components/auth/AuthContent";
import LoadingOverlay from "../../components/ui/overlays/LoadingOverlay";
import { login } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);

    const userData = await login(email, password);

    authCtx.authenticate(userData);

    if (userData != null) {
      navigation.navigate("Home");
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
