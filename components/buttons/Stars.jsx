import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

const Stars = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <FontAwesome 
          name="star-o" 
          size={24} 
          color={colors.orange} 
          style={styles.star} 
        />
        <FontAwesome 
          name="star" 
          size={24} 
          color={colors.orange} 
          style={[styles.star, { opacity: 0.5 }]} 
        />
        <FontAwesome 
          name="star" 
          size={24} 
          color={colors.orange} 
          style={styles.star} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '87%',
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligner les étoiles à droite
    alignItems: 'center',
    padding: 10,
    marginRight:25,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligner les étoiles à droite
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 5,
  },
});

export default Stars;
