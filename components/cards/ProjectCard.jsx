import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { useTheme, useNavigation } from '@react-navigation/native';
import { MyLightTheme } from '../../components/Theme';
import SimpleModal from '../modal/SimpleModal';
import PlainButton from '../buttons/PlainButton';
import FilledButton from '../buttons/FilledButton';
import Toast from 'react-native-toast-message';

const ProjectCard = ({ imageSrc, title, archived, pinned, toggleArchived, togglePinned, deleteProject }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const styles = createStyles(colors);
    const [isShowModal1, setIsShowModal1] = useState(false);
    const [isShowModal2, setIsShowModal2] = useState(false);
    const [longPressTimeout, setLongPressTimeout] = useState(null);

    const toggleModal = (setIsShowModal, isShowModal) => {
        console.log("Toggle modal");
        setIsShowModal(!isShowModal);
    };

    const handleButtonPress = (setIsShowModal, isShowModal, action) => {
        toggleModal(setIsShowModal, isShowModal);
        action();
    };

    const handleIconClick = () => {
        console.log("Icon clicked");
        toggleModal(setIsShowModal2, isShowModal2);
    };

    const handleLongPress = () => {
        console.log("Long press detected");
        setLongPressTimeout(setTimeout(() => {
            console.log("Timeout reached, deleting project");
            deleteProject()
                .then(() => {
                    console.log("Projet supprimé avec succès");
                    Toast.show({
                        type: 'success',
                        text1: 'Projet supprimé',
                        text2: 'Le projet a été supprimé avec succès.'
                    });
                    setIsShowModal2(false);
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression du projet:", error);
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: 'Une erreur est survenue lors de la suppression du projet'
                    });
                });
        }, 1000)); // 1 seconde
    };
    
    const handlePressOut = () => {
        console.log("Press out detected");
        if (longPressTimeout) {
            clearTimeout(longPressTimeout);
            setLongPressTimeout(null);
        }
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
                    archived ?
                    <FilledButton 
                        text='Archiver' 
                        background={MyLightTheme.colors.lightGreen} 
                        style={styles.btn}
                        onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, toggleArchived)}
                    /> :
                    <PlainButton 
                        text='Archiver' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, toggleArchived)}
                    />
                }
                button2={
                    pinned ?
                    <FilledButton 
                        text='Épingler' 
                        background={MyLightTheme.colors.lightGreen} 
                        style={styles.btn}
                        onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, togglePinned)}
                    /> :
                    <PlainButton 
                        text='Épingler' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, togglePinned)}
                    />
                }
                button3={
                    <View style={styles.btnDelete}>
                        <FilledButton 
                            text='Supprimer' 
                            background={MyLightTheme.colors.orange} 
                            full={true}
                            style={styles.btn}
                            onLongPress={handleLongPress}
                            onPressOut={handlePressOut}
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
    archived: PropTypes.bool.isRequired,
    pinned: PropTypes.bool.isRequired,
    toggleArchived: PropTypes.func.isRequired,
    togglePinned: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
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