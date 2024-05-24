import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const PlainButton = ({ onPress, text, background, full }) => {
    const styles =  createStyles(background)                     // Création des styles dynamiques en fonction de la couleur de fond
    let size;                                                    // Détermination de la taille du bouton en fonction de la prop "full"
full ? size = '90%' : size = '50%'                 
  return (
    <View style={{width: size}}>                                 // Définition de la largeur du bouton en fonction de la variable "size"
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    </View>
  );
};

PlainButton.propTypes = {                           
  onPress: PropTypes.func.isRequired,               
  text: PropTypes.string.isRequired,                
};


const createStyles = (background) => StyleSheet.create({
  button: {
    backgroundColor: background,
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
   
  },
  text: {
    color: '#FFF', 
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 0.25
  }
});

export default PlainButton;
