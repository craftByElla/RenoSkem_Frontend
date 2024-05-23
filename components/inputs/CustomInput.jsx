import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomInput = ({ placeholder, secureTextEntry = false, search = false, validationRegex, value, onChangeText, suffix }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(!secureTextEntry);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleTextChange = (text) => {
    onChangeText(text);
    if (validationRegex && !validationRegex.test(text)) {
      setError(`Invalid ${placeholder.toLowerCase()} format`);
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
        secureTextEntry={!isPasswordVisible}
        onChangeText={handleTextChange}
        value={value}
        keyboardType={placeholder.toLowerCase().includes('email') ? 'email-address' : placeholder.toLowerCase().includes('budget') ? 'numeric' : 'default'}
        autoCapitalize={placeholder.toLowerCase().includes('email') ? 'none' : 'sentences'}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <FontAwesome name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="#6F797B" />
        </TouchableOpacity>
      )}
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

CustomInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  search: PropTypes.bool,
  validationRegex: PropTypes.instanceOf(RegExp),
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  suffix: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#D5CDD2',
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: '#000000',
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    flex: 1,
  },
  inputWithSearch: {
    marginLeft: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  suffix: {
    color: '#6F797B',
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
    marginLeft: 5,
  },
});

export default CustomInput;
