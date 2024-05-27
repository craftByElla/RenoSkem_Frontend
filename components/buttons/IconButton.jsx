import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';         // Importation de PropTypes pour la validation des types de propriétés

const IconButton = ({ onPress, style, iconName, color = '#194852' }) => {       // Définition du composant fonctionnel IconButton
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <FontAwesome name={iconName} style={[styles.icon, { color }]} />          {/* Combine les styles par défaut et ceux passés en prop avec "style"*/}
    </TouchableOpacity>
  );
};
                                         
                                            // Validation des types des propriétés attendues par le composant
IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,       // La fonction "onPress" est requise et doit être de type fonction
  style: PropTypes.object,                  // Le style est optionnel et doit être de type objet
  iconName: PropTypes.string.isRequired,    // Le nom de l'icône est requis et doit être de type chaîne de caractères
  color: PropTypes.string,                  // La couleur est optionnelle et doit être de type chaîne de caractères
};

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 15,
  },
});

export default IconButton;
