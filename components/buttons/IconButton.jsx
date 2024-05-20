import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const IconButton = ({ onPress, style, iconName }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <FontAwesome name={iconName} style={styles.icon} />
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  iconName: PropTypes.string.isRequired,
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

export default IconButton;
