import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import * as Font from 'expo-font';

const LogoConnexionPage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Orbitron-Regular': require('../../assets/fonts/Orbitron-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Render nothing or a fallback UI until fonts are loaded
    return null;
  }

  return (
    <View style={styles.logoContainer}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>RENOSKEM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 198,
    height: 43,
    alignItems: 'center',
    margin: 20, 
    flexShrink: 0,
    flexDirection: 'row', // Pour aligner les éléments horizontalement
  },
  logo: {
    width: 35.341,
    height: 40.768,
    flexShrink: 0,
  },
  text: {
    color: '#194852',
    fontFamily: 'Orbitron-Regular', 
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: "600", //poids de la police
    lineHeight: 23, 
    letterSpacing: -1.2,
    textAlignVertical: 'center', // Centre le texte verticalement
    marginTop: 5,
    marginLeft: 10,
  },
});

export default LogoConnexionPage;
