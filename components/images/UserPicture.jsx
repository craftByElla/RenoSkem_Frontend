import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const UserPicture = () => {
  return (
    <View style={styles.container}>
      <FontAwesome name="user" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 70, // Taille de l'icône
    color: 'rgba(111, 121, 123, 1)',
  },
});

export default UserPicture;
