import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const ProjectCard = ({ imageSrc, title }) => {
  return (
    <View style={styles.card}>
      <FontAwesome name="ellipsis-v" style={styles.trailingIcon} />
      <Image source={imageSrc} style={styles.image} />
      <Text style={styles.projectTitle}>{title}</Text>
    </View>
  );
};

ProjectCard.propTypes = {
  imageSrc: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    width: 300,
    height: 125,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: '#FFF',
    position: 'relative',
  },
  trailingIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 20,
    color: '#6F797B',
  },
  image: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  projectTitle: {
    color: '#6F797B',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: 0.5,
  },
});

export default ProjectCard;
