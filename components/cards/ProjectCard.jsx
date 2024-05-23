import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { useTheme, useNavigation } from '@react-navigation/native';
import { MyLightTheme } from '../../components/Theme';
import SimpleModal from '../modal/SimpleModal';
import PlainButton from '../buttons/PlainButton';
import FilledButton from '../buttons/FilledButton';

const ProjectCard = ({ imageSrc, title }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const styles = createStyles(colors);
    const [isShowModal1, setIsShowModal1] = useState(false);
    const [isShowModal2, setIsShowModal2] = useState(false);

    const toggleModal = (setIsShowModal, isShowModal) => {
        setIsShowModal(!isShowModal);
    };

    const handleButtonPress = (setIsShowModal, isShowModal, action) => {
        toggleModal(setIsShowModal, isShowModal);
        action();
    };

    const handleIconClick = () => {
        toggleModal(setIsShowModal2, isShowModal2);
    };

    return (
        <View style={styles.projectContainer}>
            <TouchableOpacity style={styles.card} onPress={() => toggleModal(setIsShowModal1, isShowModal1)}>
                <TouchableOpacity onPress={handleIconClick} style={styles.iconContainer}>
                    <FontAwesome name="ellipsis-h" style={styles.trailingIcon} />
                </TouchableOpacity>
                <Image source={typeof imageSrc === 'string' ? { uri: imageSrc } : imageSrc} style={styles.image} />
                <Text style={styles.projectTitle}>{title}</Text>
            </TouchableOpacity>
            <SimpleModal 
                isShow={isShowModal1} 
                toggleModal={() => toggleModal(setIsShowModal1, isShowModal1)}
                title={title}
                button1={
                    <PlainButton 
                        text='1 - Périmètre' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowModal1, isShowModal1, () => navigation.navigate('ProjectStack', { screen: 'RoomsScreen' }))}
                    />
                }
                button2={
                    <PlainButton 
                        text='2 - Artisans' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowModal1, isShowModal1, () => navigation.navigate('ProjectStack', { screen: 'ArtisanScreen' }))}
                    />
                }
                button3={
                    <PlainButton 
                        text='3 - DYI ou PRO' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowModal1, isShowModal1, () => navigation.navigate('ProjectStack', { screen: 'DIYOrProScreen' }))}
                    />
                }
                button4={
                    <PlainButton 
                        text='4 - Planification' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowModal1, isShowModal1, () => navigation.navigate('ProjectStack', { screen: 'PlanningScreen' }))}
                    />
                }
            />
            <SimpleModal 
                isShow={isShowModal2} 
                toggleModal={() => toggleModal(setIsShowModal2, isShowModal2)}
                title="Options"
                button1={
                    <PlainButton 
                        text='Archiver' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, () => console.log('Archiver'))}
                    />
                }
                button2={
                    <PlainButton 
                        text='Épingler' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, () => console.log('Épingler'))}
                    />
                }
                button3={
                    <View style={styles.btnDelete}>
                        <FilledButton 
                            text='Supprimer' 
                            background={MyLightTheme.colors.orange} 
                            full={true}
                            onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, () => console.log('Supprimer'))}
                        />
                    </View>
                }
            />
        </View>
    );
};

ProjectCard.propTypes = {
    imageSrc: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            uri: PropTypes.string,
        })
    ]).isRequired,
    title: PropTypes.string.isRequired,
};

const createStyles = (colors) => StyleSheet.create({
    projectContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    card: {
        display: 'flex',
        width: '80%', 
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
    iconContainer: {
        position: 'absolute',
        top: 1,
        right: 1,
        padding: 10,
    },
    trailingIcon: {
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
        margin: 'auto',
    },
    btnDelete: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 8,
        width: '100%',
    }
});

export default ProjectCard;
