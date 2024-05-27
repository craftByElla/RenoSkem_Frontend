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
import { useState,useEffect } from "react";

const ipString = process.env.IP_KEY;

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


    useEffect(() => {
        fetch(`${ipString}/teammates/newTeammate`,{   //fetch vers la route newTeammates pour creer un nouveau coéquipier.
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({name:text}),
        })
          .then(response => response.json())
          .then(newTeammate => {console.log(newTeammate)})
          .catch((error) => console.error("Error:", error));
      }, []);



      useEffect(() => {  
        fetch(`${ipString}/skills/setSkills`,{   // fetch vers la route newSkills pour creer de nouvelles compétences
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            chauffage: 1,
            cloisonnementPlatrage: 2,
            demolition: 3,
            electricite: 1,
            etancheite: 2,
            facade: 3,
            fondations: 1,
            installationCuisineSDB: 2,
            isolation: 3,
            maconnerie: 1,
            menuiserie: 2,
            montageDeMeuble: 3,
            peinture: 1,
            plomberie: 2,
            revetementsMuraux: 2,
            revetementsSol: 1,
            revetementsExterieurs: 2,
            toiture: 3,
            ventilation: 1
        }),
        })
        .then(response => response.json())
        .then(skills => {console.log(skills)})
        .catch((error) => console.error("Error:", error));
      }, []); 



      useEffect(() => {                                    
        fetch(`${ipString}/teammates/addSkillsToTeammate/${teammates._id}/${skills._id}`,{   // fetch vers la route addSkillsToTeammates pour assignées les compétences au teammates
          method:'PUT',
          headers:{'Content-Type':'application/json'},
        })
          .then(response => response.json())
          .catch((error) => console.error("Error:", error));
      }, []); 

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>
          <View style={styles.header}>
            <IconButton
              style={styles.iconArrow}
              onPress={() => navigation.navigate("TeamScreen")}
              iconName="arrow-left"
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

