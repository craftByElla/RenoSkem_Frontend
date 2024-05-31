import React from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AvatarCard from "../../components/cards/AvatarCard";
import IconButton from "../../components/buttons/IconButton";
import ScreenTitle from "../../components/text/ScreenTitle";
import LogoTransparent from "../../components/logos/LogoTransparent";
import CustomInput from "../../components/inputs/CustomInput";
import SimpleModal from "../../components/modal/SimpleModal";
import FilledButton from "../../components/buttons/FilledButton";
import PlainButton from "../../components/buttons/PlainButton";
import { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import ArtisanCard from "../../components/cards/ArtisanCard";

const logo = require("../../assets/splash.png");
const ipString = process.env.IP_ADDRESS;


export default function TeamScreen({ navigation }) {
  const { colors } = useTheme();
  const [teammatesData, setTeammatesData] = useState([]);
  const [artisansData, setArtisansData] = useState([]);
  const token = useSelector((state) => state.user.userInfos.token)    // recuperation du token dans redux
  

  useEffect(() => {                                                   //fetch pour recuperer tout les teammates de l'utilisateur
    fetch(`${ipString}/users/getUserTeammates/${token}`,{
       headers:{'Content-Type':'application.json'},
    })
        .then (response => response.json())
        .then(data => {  
          if (data) {
          console.log(data.teammates); //  => on recupere bien la data
          setTeammatesData(data.teammates); // Mettre à jour l'état avec les données récupérées
      } else {
          console.log("Data is undefined or empty");
      }
      })
        .catch ((error) => console.log("error:",error));
  },[ipString, token]);


  const avatars = Array.isArray(teammatesData) && teammatesData.length > 0
    ? teammatesData.map((data, i) => (
        <AvatarCard
          key={i}
          name={data.name}
          image={data.avatar}
          onPress={() => navigation.navigate("TeammateSkillsScreen")}
        />
      ))
      : <Text>No teammates found.</Text>;


  useEffect(() => {
    fetch(`${ipString}/users/getUserArtisans/${token}`)               // fetch pour recuperer tout les artisans de l'utilisateur
        .then(response => response.json())
        .then (data => setArtisansData(data.artisans))
    },[ipString, token]);


    const artisans = Array.isArray(artisansData) && artisansData.length > 0
    ? artisansData.map((data, i) => (                                  // .map pour afficher les artisans sur teamScreen
    <ArtisanCard 
      key={i} 
      name={data.company} 
      field={data.field} 
      onPress={() => navigation.navigate("ConfigureExpertiseScreen")} 
      />
  ))
  : <Text>No teammates found.</Text>;


  const [isShowModal, setIsShowModal] = useState(false);
  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  const [isShowModal_2, setIsShowModal_2] = useState(false);
  const toggleModal_2 = () => {
    setIsShowModal_2(!isShowModal_2);
  };

 

  return (
    <View style={styles.Teammates}>
      <View style={styles.logo}>
        <LogoTransparent />
      </View>
      <View style={styles.h1}>
        <ScreenTitle text="Mon équipe" />
      </View>
      <View style={styles.iconsContainer}>
        <IconButton
          iconName="plus-circle"
          onPress={() => setIsShowModal_2(true)}
        />
        <IconButton iconName="filter" onPress={() => setIsShowModal(true)} />
      </View>
      <View style={styles.searchContainer}>
        <CustomInput placeholder="Rechercher" search={true} />
      </View>
      <ScrollView contentContainerStyle={styles.avatarContainer}>
      {avatars.length > 0 && artisans.length > 0 ? (
        <View style={styles.avatarContainer}>
        {avatars}
        {artisans}
    </View>
  ) : (
    <Image source={require('../../assets/giphy.gif')} style={styles.curly} />
  )}
      </ScrollView>
      <SimpleModal
        isShow={isShowModal}
        toggleModal={toggleModal}
        title="Filtres"
        button1={
          <FilledButton
            text="Proches"
            background={colors.deepGreen}
            full={true}
          />
        }
        button2={
          <View style={styles.artisanButton}>
            <PlainButton
              text="Artisans"
              background={colors.deepGreen}
              full={true}
            />
          </View>
        }
      />
      <SimpleModal
        isShow={isShowModal_2}
        toggleModal={toggleModal_2}
        title="Ajout d'un nouveau "
        button1={
          <FilledButton
            text="Coéquipier"
            onPress={() => navigation.navigate("NewCoworkerScreen")}
            background={colors.deepGreen}
            full={true}
          />
        }
        button2={
          <View style={styles.artisanButton}>
            <PlainButton
              text="Artisan"
              onPress={() => navigation.navigate("NewArtisanScreen")}
              background={colors.deepGreen}
              full={true}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({

  artisanButton: {
    width:"90%",
    paddingTop:5,
  },

  Teammates: {
   flex:1,

  },

  logo: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  h1: {
    position: "absolute",
    width: 321,
    height: 46,
    left: 34,
    top: 126,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 800,
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

  searchContainer: {
    marginTop: 50,
    marginLeft: 35,
    paddingTop:20,
  },

  avatarContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  curly: {
    width:400,
    height:400,

  },
});
