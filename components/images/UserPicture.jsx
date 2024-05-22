import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserPicture = ({ avatar }) => {

  return (
    <View style={styles.container}>
      {avatar ? (
        
        <Image source={{ uri: {avatar} }} style={styles.image} />
      ) : (
        <FontAwesome name="user" style={styles.icon} />
      )}
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
    overflow: 'hidden',
  },
  icon: {
    fontSize: 70,
    color: 'rgba(111, 121, 123, 1)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default UserPicture;
