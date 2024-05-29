import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import IconButton from "../../components/buttons/IconButton";
import PageTitle from "../../components/text/ScreenTitle";
import FilledButton from "../../components/buttons/FilledButton";
import Stars from "../../components/buttons/Stars";
import TextWithRadioButton from "../../components/buttons/TextWithRadioButtons";
import { useSelector } from 'react-redux';

const picture = require("../../assets/Gabin.jpg");
const ipString = process.env.IP_ADDRESS;

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
  const [skills, setSkills] = useState({});
  const token = useSelector((state) => state.user.userInfos.token)

  // Mise à jour de l'état lorsqu'une compétence est sélectionnée
  const handleSkillChange = (posteIndex, niveau) => {
    const poste = postesTravaux[posteIndex];
    setSkills((prevSkills) => ({
      ...prevSkills,
      [poste]: niveau,
    }));
  };

  const createTeammate = async () => {
    const skillsData = {
      chauffage: skills["Chauffage"],
      cloisonnementPlatrage: skills["Cloisonnement/Plâtrage"],
      demolition: skills["Démolition"],
      electricite: skills["Électricité"],
      etancheite: skills["Étanchéité"],
      facade: skills["Façade"],
      fondations: skills["Fondations"],
      installationCuisineSDB: skills["Installation cuisine/SDB"],
      isolation: skills["Isolation"],
      maconnerie: skills["Maçonnerie"],
      menuiserie: skills["Menuiserie"],
      montageDeMeuble: skills["Montage de meuble"],
      peinture: skills["Peinture"],
      plomberie: skills["Plomberie"],
      revetementsMuraux: skills["Revêtements muraux"],
      revetementsSol: skills["Revêtements sol"],
      revetementsExterieurs: skills["Revêtements extérieurs"],
      toiture: skills["Toiture"],
      ventilation: skills["Ventilation"],
    };

    try {
      const response = await fetch(`${ipString}/teammates/newTeammate/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
                  name: text,
                 }),
      });

      if (response.status === 201) {
        const data = await response.json();
        const teammateId = data.teammate._id;
        console.log("Réponse du serveur:", data);

        const createSkillsResponse = await fetch(`${ipString}/skills/setSkills`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(skillsData),
        });

        if (createSkillsResponse.status === 201) {
          const data2 = await createSkillsResponse.json();
          const skillsId = data2.skills._id;
          console.log("Réponse du serveur:", data2);

          const addSkillsResponse = await fetch(`${ipString}/teammates/addSkillsToTeammate/${teammateId}/${skillsId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const addSkillsData = await addSkillsResponse.json();
          console.log("Réponse de la mise à jour des compétences de l'utilisateur:", addSkillsData);

          // Affichage d'un message de succès ou d'erreur
          if (addSkillsResponse.status === 200) {
            Toast.show({
              type: "success",
              text1: "Succès",
              text2: "Compétences mises à jour avec succès",
            });
            navigation.navigate("TeamScreen");
          } else {
            Toast.show({
              type: "error",
              text1: "Erreur",
              text2: addSkillsData.message,
            });
          }
        } else {
          Toast.show({
            type: "error",
            text1: "Erreur",
            text2: "Échec de la création des compétences.",
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: "Échec de la création de l'équipier.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Une erreur s'est produite.",
      });
    }
  };

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
          <TextWithRadioButton
            key={index}
            text={poste}
            index={index}
            selectedButton={skills[poste]}
            handlePress={ handleSkillChange}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.enregistrer}>
        <FilledButton
          text="Enregistrer"
          background={colors.deepGreen}
          full={true}
          onPress={() => createTeammate()}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollableSection: {
    height: "50%",
  },
  arrowLeft: {
    marginTop: 50,
    marginLeft: 20,
  },
  searchContainer: {
    marginLeft: 50,
  },
  input: {
    marginRight: 200,
    marginTop: 20,
    fontSize: 18,
  },
  border: {
    marginLeft: 50,
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
