import { StatusBar } from "expo-status-bar";
import AuthContextProvider from "./store/auth-context";

import Navigator from "./screens/Navigator";

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <StatusBar style="auto" hidden={false} />
        <Navigator />
      </AuthContextProvider>
    </>
  );
}
