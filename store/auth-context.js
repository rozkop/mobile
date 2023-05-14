import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  userData: {},
  token: "",
  user: {},
  isAuthenticated: false,
  authenticate: (userData) => {},
  logout: () => {},
  isAuthor: (userId) => {},
});

function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const storedUser = await AsyncStorage.getItem("userData");

      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }

    fetchUser();
  }, []);

  function authenticate(userData) {
    if (userData != null) {
      setUserData(userData);
      AsyncStorage.setItem("userData", JSON.stringify(userData));
    }
  }

  function logout() {
    setUserData([]);
    AsyncStorage.removeItem("userData");
  }

  function isAuthor(userId) {
    if (!!userData.token) {
      if (userData.user.id === userId) {
        return true;
      } else {
        return false;
      }
    }
  }

  const value = {
    token: userData.token,
    user: userData.user,
    userData: userData,
    isAuthenticated: !!userData.token,
    authenticate: authenticate,
    logout: logout,
    isAuthor: isAuthor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
