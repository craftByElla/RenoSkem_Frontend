import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

const TextWithRadioButtons = ({ text }) => {
  const [selectedButton, setSelectedButton] = useState(null);  // Utilisation du hook useState de React pour gérer l'état du bouton sélectionné
  const { colors } = useTheme();               // Utilisation du hook useTheme pour accéder aux couleurs du thème actuel

  const handlePress = (index) => {             // Fonction pour gérer l'événement de pression sur un bouton
    setSelectedButton(index);                  // Met à jour l'état selectedButton avec l'index du bouton pressé
  };

  const renderButton = (index) => {                              // Fonction pour rendre un bouton spécifique
    const isSelected = selectedButton === index;                   // Vérifie si le bouton courant est celui qui est sélectionné
    const iconName = isSelected ? 'dot-circle-o' : 'circle-o';       // Détermine le nom de l'icône en fonction de l'état de sélection
    const iconColor = isSelected ? colors.lightGreen : colors.deepGreen;  // Détermine la couleur de l'icône en fonction de l'état de sélection

    return (
      <TouchableOpacity key={index} onPress={() => handlePress(index)}>  // Utilise l'index comme clé pour l'élément
        <FontAwesome 
          name={iconName} 
          size={24} 
          color={iconColor} 
          style={styles.icon} 
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.deepGreen }]}>{text}</Text>
      <View style={styles.buttonContainer}>
        {renderButton(0)}
        {renderButton(1)}
        {renderButton(2)}
      </View>
    </View>
  );
};

TextWithRadioButtons.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '92.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default TextWithRadioButtons;
