import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Divider = ({ text = "Ou" }) => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.line}></View>
      <View style={styles.box}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};

Divider.propTypes = {
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    width: 335,
    alignItems: 'center'
  },
  line: {
    width: 142,
    height: 1,
    backgroundColor: '#6f797b'
  },
  box: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  text: {
    color: '#6f797b',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: "400",
    lineHeight: 21 // 150%
  }
});

export default Divider;
