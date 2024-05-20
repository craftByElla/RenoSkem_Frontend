import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CustomInput = ({ placeholder, secureTextEntry = false }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#6F797B"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

CustomInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#D5CDD2',
    marginVertical: 15,
  },
  input: {
    color: '#000000', // Texte principal en noir
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    width: '100%',
  },
});

export default CustomInput;
