import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { useTheme, useNavigation } from '@react-navigation/native';
import SimpleModal from '../modal/SimpleModal';
import PlainButton from '../buttons/PlainButton';

const ProjectCard = ({ imageSrc, title }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const styles = createStyles(colors);
    const [isShowModal, setIsShowModal] = useState(false);
    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    };

    const handleButtonPress = (action) => {
        toggleModal();
        action();
    };

    return (
        <TouchableOpacity style={styles.projectContainer} onPress={() => toggleModal()}>
            <View style={styles.card}>
                <FontAwesome name="ellipsis-h" style={styles.trailingIcon} />
                <Image source={imageSrc} style={styles.image} />
                <Text style={styles.projectTitle}>{title}</Text>
            </View>
            <SimpleModal 
                isShow={isShowModal} 
                toggleModal={toggleModal}
                title={title}
                button1={
                    <PlainButton 
                        text='1 - Périmètre' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() => navigation.navigate('CreateProjectStack', { screen: 'RoomsScreen' }))}
                    />
                }
                button2={
                    <PlainButton 
                        text='2 - Artisans' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() => navigation.navigate('CreateProjectStack', { screen: 'ArtisanScreen' }))}
                    />
                }
                button3={
                    <PlainButton 
                        text='3 - DYI ou PRO' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() => navigation.navigate('CreateProjectStack', { screen: 'DIYOrProScreen' }))}
                    />
                }
                button4={
                    <PlainButton 
                        text='4 - Planification' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() => navigation.navigate('CreateProjectStack', { screen: 'PlanningScreen' }))}
                    />
                }
            />
        </TouchableOpacity>
    );
};

ProjectCard.propTypes = {
  imageSrc: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const createStyles = (colors) => StyleSheet.create({
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
    backgroundColor: colors.modalBackgroundColor,
    position: 'relative',
    marginBottom: 10,
  },
  trailingIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 20,
    color: colors.deepGrey,
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
    color: colors.deepGrey,
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: 0.5,
  },
  btn: {
    width: '90%',
    margin: 'auto'
  },
});

export default ProjectCard;
