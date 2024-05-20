import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Avatar from "../../components/avatar";

const logo = require("../../assets/splash.png");

export default function TeamScreen({ navigation }) {
  const avatarsData = [
    { name: "martin", image: require("../../assets/Martin.jpg") },
    { name: "jc", image: require("../../assets/jc.jpg") },
    { name: "ella", image: require("../../assets/Ella.jpg") },
    { name: "gaël", image: require("../../assets/henry.jpg") },
    { name: "cece", image: require("../../assets/Gabin.jpg") },
  ];

  const avatars = avatarsData.map((data, i) => {
    return <Avatar key={i} name={data.name} image={data.image} />;
  });

  return (
    <View style={styles.Teammates}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.h1}>Mon équipe</Text>
      </View>
      <View style={styles.iconsContainer}>
        <FontAwesome name="plus-circle" style={styles.plusCircle} />
        <FontAwesome name="filter" style={styles.filter} />
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" style={styles.search} />
        <TextInput placeholder="Rechercher" style={styles.inputSearch} />
      </View>
      <View>{avatars}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  Teammates: {
    position: "relative",
    width: 375,
    height: 812,
    backgroundColor: "#EFECEA",
    borderRadius: 50,
  },
  logo: {
    position: "absolute",
    width: 35.34,
    height: 40.77,
    left: 171,
    top: 54,
  },
  h1: {
    position: "absolute",
    width: 321,
    height: 46,
    left: 34,
    top: 126,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: 0.15,
    color: "#194852",
  },
  iconsContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 118,
    right: 20,
  },
  plusCircle: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  filter: {
    width: 48,
    height: 48,
  },
  searchContainer: {
    position: "absolute",
    width: 313,
    height: 49,
    left: 32,
    top: 166,
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  inputSearch: {
    flex: 1,
    height: 49,
    paddingLeft: 10,
  },
});
