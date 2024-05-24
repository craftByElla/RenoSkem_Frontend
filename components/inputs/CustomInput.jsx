import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomInput = ({ placeholder, secureTextEntry = false, search = false, validationRegex }) => {  // Définition du composant fonctionnel CustomInput avec des props
  const [isPasswordVisible, setPasswordVisible] = useState(!secureTextEntry); // Définition de l'état local pour contrôler la visibilité du mot de passe
  const [inputValue, setInputValue] = useState('');       // Définition de l'état local pour stocker la valeur de l'entrée utilisateur
  const [error, setError] = useState('');     // Définition de l'état local pour gérer les messages d'erreur de validation

  const togglePasswordVisibility = () => {    // Fonction pour basculer la visibilité du mot de passe
    setPasswordVisible(!isPasswordVisible);
  };

  const handleTextChange = (text) => {        // Fonction pour gérer le changement de texte dans l'input
    setInputValue(text);
    if (validationRegex && !validationRegex.test(text)) {  // Validation du texte si un regex de validation est fourni
      setError('Invalid email format');
    } else {
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      {search && (
        <FontAwesome name="search" size={20} color="#6F797B" style={styles.searchIcon} />
      )}
      <TextInput
        style={[styles.input, search && styles.inputWithSearch]}
        placeholder={placeholder}
        placeholderTextColor="#6F797B"
        secureTextEntry={!isPasswordVisible}  // Cache le texte si 'isPasswordVisible' est faux
        onChangeText={handleTextChange}
        value={inputValue}
      />
      {secureTextEntry && (    // Affiche une icône de visibilité de mot de passe si 'secureTextEntry' est vrai
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <FontAwesome name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="#6F797B" />
        </TouchableOpacity>
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

CustomInput.propTypes = {              // Validation des types des props du composant
  placeholder: PropTypes.string.isRequired,  // Prop obligatoire pour le placeholder
  secureTextEntry: PropTypes.bool,  // Prop optionnelle pour sécuriser l'entrée de texte (mot de passe)
  search: PropTypes.bool,   // Prop optionnelle pour afficher une icône de recherche
  validationRegex: PropTypes.instanceOf(RegExp),  // Prop optionnelle pour la validation du texte
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#D5CDD2',
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: '#000000', // Texte principal en noir
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    flex: 1,
  },
  inputWithSearch: {
    marginLeft: 10, // Add margin to make space for the search icon
  },
  eyeIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
});

export default CustomInput;
