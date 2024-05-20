import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const PageTitle = ({ text }) => {
  return (
    <Text style={styles.title}>
      {text}
    </Text>
  );
};

PageTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  title: {
    width: 321,
    height: 46,
    flexShrink: 0,
    color: '#194852',
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 36, // 150%
    letterSpacing: 0.15,
  },
});

export default PageTitle;
