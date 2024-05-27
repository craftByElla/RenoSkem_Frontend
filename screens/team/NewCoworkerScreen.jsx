import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import IconButton from "../../components/buttons/IconButton";
const picture = require("../../assets/Gabin.jpg");
import PageTitle from "../../components/text/ScreenTitle";
import FilledButton from "../../components/buttons/FilledButton";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Stars from "../../components/buttons/Stars";
import TextWithRadioButton from "../../components/buttons/TextWithRadioButtons";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const postesTravaux = [
  "Chauffage",
  "Cloisonnement/Plâtrage",
  "Démolition",
  "Électricité",
  "Étanchéité",
  "Façade",
  "Fondations",
  "Installation cuisine/SDB",
  "Isolation",
  "Maçonnerie",
  "Menuiserie",
  "Montage de meuble",
  "Peinture",
  "Plomberie",
  "Revêtements muraux",
  "Revêtements sol",
  "Revêtements extérieurs",
  "Toiture",
  "Ventilation",
];

export default function TeammateSkillsScreen({ navigation }) {
  const { colors } = useTheme();

  const [text, setText] = useState("");

  return (
    <SafeAreaView>
      <View style={styles.newTeammateSkills}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="long-arrow-left" style={styles.arrowLeft} />
        </TouchableOpacity>
        <View>
          <Image source={picture} style={styles.picture} />
        </View>
      </View>
      <View style={styles.h1}>
        <PageTitle text="Créer un nouvel équipier" />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={text}
          onChangeText={setText}
        />
      </View>
      <View style={styles.border}></View>
      <Stars style={styles.stars} />
      <ScrollView
        style={styles.scrollableSection}
        contentContainerStyle={styles.scrollableContent}
      >
        {postesTravaux.map((poste, index) => (
          <TextWithRadioButton key={index} text={poste} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.enregistrer}>
        <FilledButton
          text="Enregistrer"
          background={colors.deepGreen}
          full={true}
          onPress={() => navigation.navigate("TeamScreen")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  scrollableSection:{
    height:"50%",
  },

  arrowLeft: {
     marginTop:50,
     marginLeft:20,

  },

  searchContainer: {
    marginLeft:50,

  },

  input: {
    marginRight: 200,
    marginTop: 20,
    fontSize: 18,
  },

  border: {
    marginLeft:50,
    borderBottomWidth: 1,
    borderBottomColor: "#D5CDD2",
    padding: 5,
    width: "70%",
  },

  main: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  picture: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 160,
  },

  h1: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  iconArrow: {
    position: "absolute",
    left: 20,
    top: "50%",
    marginTop: -25,
  },
 
  header: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: 50,
  },

  enregistrer: {
    width: "100%",
    alignItems: "center",

  },
});
