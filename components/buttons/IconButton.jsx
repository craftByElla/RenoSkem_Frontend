import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const IconButton = ({ onPress, style, iconName, color = '#194852' }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <FontAwesome name={iconName} style={[styles.icon, { color }]} />
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string,
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
