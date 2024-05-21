import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

const TextWithRadioButtons = ({ text }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const { colors } = useTheme();

  const handlePress = (index) => {
    setSelectedButton(index);
  };

  const renderButton = (index) => {
    const isSelected = selectedButton === index;
    const iconName = isSelected ? 'dot-circle-o' : 'circle-o';
    const iconColor = isSelected ? colors.lightGreen : colors.deepGreen;
    
    return (
      <TouchableOpacity key={index} onPress={() => {handlePress(index), console.log(selectedButton)}}>
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
