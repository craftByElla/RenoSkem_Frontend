import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MyLightTheme } from '../../components/Theme';

const ProjectPicture = ({ projectIcon }) => {
  
  return (
    <View style={styles.container}>
      {projectIcon ? (
        
        <Image source={{ uri: {projectIcon} }} style={styles.image} />
      ) : (
        <FontAwesome name="image" style={styles.icon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    fontSize: 70,
    color: MyLightTheme.colors.lightOrangeWithOpacity
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ProjectPicture;
