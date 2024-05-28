import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { useTheme } from "@react-navigation/native";

function LogoTransparent() {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.logoContainer}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
    </View>
  );
}

export default LogoTransparent;

const createStyles = (colors) =>
  StyleSheet.create({
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      width: 40,
      borderRadius: 10,
    },
    logo: {
      width: 35.341,
      height: 40.768,
      opacity: 0.2,
    },
  });
