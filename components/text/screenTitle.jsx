import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ScreenTitle = ({ text }) => {
  return (
    <Text style={styles.title}>
      {text}
    </Text>
  );
};

ScreenTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  title: {
    width: '90%', // Occupe toute la largeur disponible
    color: '#194852',
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 36, 
    letterSpacing: 0.15,
    flexWrap: 'wrap', // Permet de faire passer le texte à la ligne
    justifyContent: 'center',
  },
});

export default ScreenTitle;
