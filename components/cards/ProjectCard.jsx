import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import { useTheme, useNavigation } from '@react-navigation/native';
import { MyLightTheme } from '../../components/Theme';
import SimpleModal from '../modal/SimpleModal';
import PlainButton from '../buttons/PlainButton';
import FilledButton from '../buttons/FilledButton';
import DeleteButton from '../buttons/DeleteButton';
import Toast from 'react-native-toast-message';

const ProjectCard = ({ imageSrc, title, archived, pinned, toggleArchived, togglePinned, deleteProject, projectId }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const styles = createStyles(colors);
    const [isShowModal1, setIsShowModal1] = useState(false);
    const [isShowModal2, setIsShowModal2] = useState(false);
    const [longPressTimeout, setLongPressTimeout] = useState(null);

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

    const handleLongPress = () => {
        setLongPressTimeout(setTimeout(() => {
            deleteProject(projectId)
                .then(() => {
                    Toast.show({
                        type: 'success',
                        text1: 'Projet supprimé',
                        text2: 'Le projet a été supprimé avec succès.'
                    });
                    setIsShowModal2(false);
                })
                .catch((error) => {
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: 'Une erreur est survenue lors de la suppression du projet'
                    });
                });
        }, 1000)); // 1 seconde
    };

    return (
        <View style={styles.projectContainer}>
            <TouchableOpacity style={styles.card} onPress={() => toggleModal(setIsShowModal1, isShowModal1)}>
                {!archived && pinned && (
                    <Entypo name="bookmark" style={styles.bookmarkIcon} />
                )}
                {archived && (
                    <Entypo name="box" style={styles.boxIcon} />
                )}
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
                    text='✏️ Modifier' 
                    style={styles.btn} 
                    onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, () => navigation.navigate('Projets', { screen: 'EditProjectScreen', params: { projectId } }))}
                    />
                }
                button2={
                    archived ?
                    <FilledButton 
                        text='📦 Archiver' 
                        background={MyLightTheme.colors.lightGreen} 
                        style={styles.btn}
                        onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, toggleArchived)}
                    /> :
                    <PlainButton 
                        text='📦 Archiver' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, toggleArchived)}
                    />
                }
                button3={
                    !archived && ( // Afficher le bouton Épingler seulement si le projet n'est pas archivé
                        pinned ?
                        <FilledButton 
                            text='🔖 Épingler' 
                            background={MyLightTheme.colors.lightGreen} 
                            style={styles.btn}
                            onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, togglePinned)}
                        /> :
                        <PlainButton 
                            text='🔖 Épingler' 
                            style={styles.btn} 
                            onPress={() => handleButtonPress(setIsShowModal2, isShowModal2, togglePinned)}
                        />
                    )
                }
                button4={
                    <View style={styles.btnDelete}>
                        <DeleteButton 
                            text='🗑️ Supprimer' 
                            style={styles.btn}
                            onLongPress={handleLongPress}
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
    projectId: PropTypes.string.isRequired, 
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
    bookmarkIcon: {
        position: 'absolute',
        top: 5,
        left: 5,
        fontSize: 20,
        color: colors.primary,
    },
    boxIcon: {
        position: 'absolute',
        top: 5,
        left: 5,
        fontSize: 20,
        color: colors.primary,
        paddingLeft: 2,
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
        marginVertical: 5,
    },
    btnDelete: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 0,
        width: '100%',
    }
});

export default ProjectCard;
