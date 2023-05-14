import { useContext } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import HomeScreen from "./HomeScreen";
import CommunityScreen from "./CommunityScreen";
import ProfileScreen from "./ProfileScreen";
import LoginScreen from "./auth/LoginScreen";
import LogoutScreen from "./auth/LogoutScreen";
import SignupScreen from "./auth/SignupScreen";
import CreateCommunityScreen from "./CreateCommunityScreen";
import UserCommunitiesScreen from "./UserCommunitiesScreen";

import Icon from "../components/Icon";
import Colors from "../constants/colors";
import { AuthContext } from "../store/auth-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  const authCtx = useContext(AuthContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: Colors.accent500,
        drawerInactiveTintColor: Colors.text,
        drawerActiveBackgroundColor: Colors.accent50,
        headerRight: () => {
          return (
            <View style={{ margin: 17 }}>
              <Icon size={40} />
            </View>
          );
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      {!authCtx.isAuthenticated ? (
        <Drawer.Screen
          name="Auth"
          component={AuthStack}
          options={{
            title: "Log In / Sign Up",
            headerTitle: "",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="login" color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
      ) : (
        <>
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: "Profile",
              drawerIcon: ({ size, color }) => (
                <Ionicons name="person" color={color} size={size} />
              ),
              unmountOnBlur: true,
            }}
          />
          <Drawer.Screen
            name="UserCommunities"
            component={UserCommunitiesScreen}
            options={{
              title: "Your communities",
              drawerIcon: ({ size, color }) => (
                <Ionicons name="people" color={color} size={size} />
              ),
              unmountOnBlur: true,
            }}
          />

          <Drawer.Screen
            name="CreateCommunity"
            component={CreateCommunityScreen}
            options={{
              title: "Create a community",
              drawerIcon: ({ size, color }) => (
                <MaterialCommunityIcons
                  name="pencil-box-multiple-outline"
                  color={color}
                  size={size}
                />
              ),
              unmountOnBlur: true,
            }}
          />

          <Drawer.Screen
            name="Logout"
            component={LogoutScreen}
            options={{
              title: "Logout",
              drawerIcon: ({ size, color }) => (
                <MaterialIcons name="logout" color={color} size={size} />
              ),
              headerTitle: "",
              unmountOnBlur: true,
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => <Icon size={40} />,
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Community"
          component={CommunityScreen}
          options={{ unmountOnBlur: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
