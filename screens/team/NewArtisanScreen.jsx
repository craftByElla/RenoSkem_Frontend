import React from "react";
import {StyleSheet,View,TextInput,TouchableOpacity} from "react-native";
import LogoTransparent from "../../components/logos/LogoTransparent"
import IconButton from "../../components/buttons/IconButton";
import PageTitle from "../../components/text/ScreenTitle";
import FilledButton from "../../components/buttons/FilledButton";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

export default function NewArtisanScreen({ navigation }) {
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.main}>
        <View style={styles.header}>
          <IconButton
            style={styles.iconArrow}
            onPress={() => navigation.navigate("TeamScreen")}
            iconName="arrow-left"
          />
          <View style={styles.logo}>
                <LogoTransparent/>
            </View>
        </View>
        <View style={styles.h1}>
          <PageTitle text="Créer un nouvel artisan" />
        </View>
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nom de l'entreprise"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.border}></View>
        <View style={styles.jobContainer}>
          <TextInput
            style={styles.input}
            placeholder="Choisir un métier"
            value={job}
            onChangeText={setJob}
          />
        </View>
        <View style={styles.border}></View>
        <View style={styles.emailContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.border}></View>
        <View style={styles.phoneNumberContainer}>
          <TextInput
            style={styles.input}
            placeholder="Numéro de telephone"
            value={phoneNumber}
            onChangeText={setphoneNumber}
          />
        </View>
        <View style={styles.border}></View>
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

    phoneNumberContainer:{
        marginLeft:25,   
     },

    emailContainer:{
        marginLeft:-120,
    },

    jobContainer:{
        marginLeft:-20,

    },

    logo: {
        marginTop:50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    input:{
        marginRight:100,
        marginTop:20,
        fontSize: 18,
        padding:5,
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

    h1: {
        flexDirection: "row",
        justifyContent: "center",
        marginLeft: 10,
        marginTop: 50,
      },
  
      iconArrow: {
        position: "absolute",
        left: 20,
        top: "50%",
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
        marginTop:'65%',
      },
  },
);
