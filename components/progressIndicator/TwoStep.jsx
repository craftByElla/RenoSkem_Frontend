import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const TwoStep = ({ step }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.innerBar, step === 1 ? styles.innerBarLeft : styles.innerBarRight]} />
    </View>
  );
};

TwoStep.propTypes = {
  step: PropTypes.oneOf([1, 2]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 280,
    height: 4,
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 999,
    backgroundColor: 'rgba(229, 111, 82, 0.20)',
    position: 'relative',
  },
  innerBar: {
    position: 'absolute',
    width: 140,
    height: 4,
    flexShrink: 0,
    borderRadius: 999,
    backgroundColor: '#D87559',
  },
  innerBarLeft: {
    left: 0,
  },
  innerBarRight: {
    right: 0,
  },
});

export default TwoStep;
