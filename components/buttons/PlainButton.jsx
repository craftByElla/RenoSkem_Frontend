import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const PlainButton = ({ onPress, text, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
// Définition des types de propriétés pour le composant PlainButton
PlainButton.propTypes = {
  onPress: PropTypes.func.isRequired, // La propriété onPress est requise et doit être de type fonction
  text: PropTypes.string.isRequired, // La propriété text est requise et doit être de type chaîne de caractères
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#299d8e",
    paddingVertical: 14,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  text: {
    color: "#194852",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 21,
    letterSpacing: 0.25,
  },
});

export default PlainButton;
