import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";         // Importation de PropTypes pour la validation des types de propriétés
                                            // Définition du composant fonctionnel Divider
const Divider = ({ text = "Ou" }) => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.line}></View>
      <View style={styles.box}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};

Divider.propTypes = {     // Validation des types des propriétés attendues par le composant
  text: PropTypes.string, // La propriété text est de type chaîne de caractères
};

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    width: 335,
    alignItems: 'center'
  },
  line: {
    width: 142,
    height: 1,
    backgroundColor: '#6f797b'
  },
  box: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  text: {
    color: '#6f797b',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: "400",
    lineHeight: 21 // 150%
  }
});

export default Divider;
