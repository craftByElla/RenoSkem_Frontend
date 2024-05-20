import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BackButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <FontAwesome name="arrow-left" style={styles.icon} />
    </TouchableOpacity>
  );
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
    color: 'black',
  },
});

export default BackButton;
