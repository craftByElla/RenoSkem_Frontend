import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import IconButton from "../../components/buttons/IconButton";
const picture = require("../../assets/Gabin.jpg");
import PageTitle from "../../components/text/ScreenTitle";
import FilledButton from "../../components/buttons/FilledButton";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Stars from "../../components/buttons/Stars";
import TextWithRadioButton from "../../components/buttons/TextWithRadioButtons"


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
    "Ventilation"
];


export default function TeammateSkillsScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>
      <View style={styles.header}>
        <IconButton
          style={styles.iconArrow}
          onPress={() => navigation.navigate("HomeScreen")}
          iconName="arrow-left"
        />
        
          <Image source={picture} style={styles.picture} />
        
        <IconButton
          style={styles.iconTimecircle}
          onPress={() => navigation.navigate("HomeScreen")}
          iconName="times-circle"
        />
      </View>
      <View style={styles.h1}>
        <PageTitle text="Paramétrer le niveau d'expertise" />
      </View>
      <Stars style={styles.stars}/>
        <ScrollView style={styles.scrollableSection} contentContainerStyle={styles.scrollableContent}>
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
}

const styles = StyleSheet.create({

   main : {
        height:'100%',
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
    },
  picture: {
    width: 68,
    height: 64,
    borderRadius: 50,
    marginLeft:10,
  },

  h1: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 30,
    marginTop:50,
  },

  iconArrow:{
    position: 'absolute', 
        left: 20, 
        top: '50%', 
        marginTop: -25,
        
  },
iconTimecircle: {
    position: 'absolute', 
        right: 20, 
        top: '50%', 
        marginTop: -25,
},

  header:{
    flexDirection:"row",
    justifyContent:"center",
    width:'100%',
    height:50,
    position:'relative',


  },
  enregistrer: {
    width: '100%',
    alignItems: 'center'
  }

});
