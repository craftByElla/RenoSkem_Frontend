import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

const PosteItem = ({ text, selectedButton, handlePress, index, onRemove }) => {
  const { colors } = useTheme();
    // Fonction pour rendre un bouton avec une icône, en fonction de l'index du bouton
  const renderButton = (buttonIndex) => {
    // Vérifie si le bouton courant est sélectionné
    const isSelected = selectedButton === buttonIndex;
    // Détermine le nom de l'icône à afficher (icône pleine si sélectionné, icône vide sinon)
    const iconName = isSelected ? 'dot-circle-o' : 'circle-o';
     // Détermine la couleur de l'icône (couleur différente si sélectionné)
    const iconColor = isSelected ? colors.lightGreen : colors.deepGreen;
    
    return (
      <TouchableOpacity key={buttonIndex} onPress={() => handlePress(index, buttonIndex)}>
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
      <TouchableOpacity onPress={onRemove}>
        <FontAwesome name="close" size={20} color={colors.deepGrey} />
      </TouchableOpacity>
      <Text style={[styles.text, { color: colors.deepGreen }]}>{text}</Text>
      <View style={styles.buttonContainer}>
        {renderButton(1)}
        {renderButton(2)}
        {renderButton(3)}
      </View>
    </View>
  );
};

PosteItem.propTypes = {
  text: PropTypes.string.isRequired,
  selectedButton: PropTypes.number,
  handlePress: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.15,
    marginLeft: 10,
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

export default PosteItem;
