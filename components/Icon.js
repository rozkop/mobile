import { StyleSheet, Image } from "react-native";

function Icon({ size }) {
  const imageStyle = {
    width: size,
    height: size,
    alignSelf: "center",
  };

  return <Image style={imageStyle} source={require("../assets/icon.png")} />;
}

export default Icon;
