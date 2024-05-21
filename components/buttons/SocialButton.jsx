import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SocialButton = ({ onPress, icon, text }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesome name={icon} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

SocialButton.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.oneOf(['google', 'facebook']).isRequired, // Nom des icônes FontAwesome
  text: PropTypes.string.isRequired, // Texte à afficher
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#299d8e',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginVertical: 8, // Ajout de marge verticale pour espacer les boutons
  },
  icon: {
    fontSize: 18,
    color: 'rgba(25, 72, 82, 1)',
    marginRight: 8 // Espacement entre l'icône et le texte
  },
  text: {
    color: '#194852',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: "600",
    lineHeight: 21,
    letterSpacing: 0.25
  }
});

export default SocialButton;
