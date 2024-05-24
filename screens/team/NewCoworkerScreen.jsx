import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
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
<<<<<<< HEAD
        <View style={styles.newTeammateSkills}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name="long-arrow-left" style={styles.arrowLeft} />
            </TouchableOpacity>
            <View>
                <Image source={picture} style={styles.picture} />
            </View>
            <View>
                <Text style={styles.title}>Créer un nouvel équipier</Text>
            </View>
            <TextInput
                placeholder="Prénom"
                style={styles.inputName}
=======
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>
          <View style={styles.header}>
            <IconButton
              style={styles.iconArrow}
              onPress={() => navigation.navigate("TeamScreen")}
              iconName="arrow-left"
>>>>>>> 5b2fba5c5ef87e3eda6a4d53b22dc3af8c45943f
            />
            <Image source={picture} style={styles.picture} />
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
        </View>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({

    input:{
        marginRight:200,
        marginTop:20,
        fontSize: 18,
    },

    border:{
        borderBottomWidth: 1,
        borderBottomColor: '#D5CDD2',
        padding:5,
        width:'70%'
    },

    main: {
      height: "100%",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    picture: {
      width: 68,
      height: 64,
      borderRadius: 50,
      marginLeft: 10,
    },

    h1: {
      flexDirection: "row",
      justifyContent: "center",
      marginLeft: 30,
      marginTop: 50,
    },

    iconArrow: {
      position: "absolute",
      left: 20,
      top: "50%",
      marginTop: -25,
    },
    iconTimecircle: {
      position: "absolute",
      right: 20,
      top: "50%",
      marginTop: -25,
    },

    header: {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      height: 50,
      position: "relative",
    },
    enregistrer: {
      width: "100%",
      alignItems: "center",
    },
  });

