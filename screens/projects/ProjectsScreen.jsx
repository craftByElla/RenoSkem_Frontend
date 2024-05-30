import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"; 
import { useTheme, useFocusEffect } from '@react-navigation/native';
import LogoTransparent from '../../components/logos/LogoTransparent';
import IconButton from "../../components/buttons/IconButton";
import ScreenTitle from "../../components/text/ScreenTitle";
import ProjectCard from '../../components/cards/ProjectCard';
import SimpleModal from '../../components/modal/SimpleModal';
import PlainButton from '../../components/buttons/PlainButton';
import FilledButton from '../../components/buttons/FilledButton';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
const ipString = process.env.IP_ADDRESS;

function ProjectsScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const userToken = useSelector((state) => state.user.userInfos.token);
    const [isShowFilterModal, setIsShowFilterModal] = useState(false);
    const [projects, setProjects] = useState([]);
    //états pour gérer les filtres
    const [showAllProjects, setShowAllProjects] = useState(true);
    const [showArchivedProjects, setShowArchivedProjects] = useState(false);

    const fetchProjects = async () => {
        try {
            const url = `${ipString}/projects/getUserProjects/${userToken}`;
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setProjects(data.projects);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message || 'Une erreur est survenue lors de la récupération des projets'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la récupération des projets'
            });
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProjects();
        }, [userToken])
    );

    const toggleModal = (setIsShowModal, isShowModal) => {
        setIsShowModal(!isShowModal);
    };

    const handleButtonPress = (setIsShowModal, isShowModal, action = () => {}) => {
        toggleModal(setIsShowModal, isShowModal);
        action();
    };
    

    // Fonctions pour gérer les états des filtres
    const handleShowAllProjects = () => {
        setShowAllProjects(true);
        setShowArchivedProjects(false);
    }
    const handleShowArchivedProjects = () => {
        setShowAllProjects(false);
        setShowArchivedProjects(true);
    }

    // Pour archiver un projet
    const toggleArchived = async (projectId, currentStatus) => {
        try {
            const url = `${ipString}/projects/setIsProjectArchived/${projectId}/${!currentStatus}`;
            const response = await fetch(url, { method: 'PUT' });
            const data = await response.json();

            if (response.ok) {
                fetchProjects();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message || 'Une erreur est survenue lors de la mise à jour du projet'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la mise à jour du projet'
            });
        }
    };

    //Pour épingler un projet
    const togglePinned = async (projectId, currentStatus) => {
        try {
            const url = `${ipString}/projects/setIsProjectPinned/${projectId}/${!currentStatus}`;
            const response = await fetch(url, { method: 'PUT' });
            const data = await response.json();

            if (response.ok) {
                fetchProjects();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message || 'Une erreur est survenue lors de la mise à jour du projet'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la mise à jour du projet'
            });
        }
    };


    //pour filtrer les projets
    const filteredProjects = projects
        .filter(project => showAllProjects ? !project.archived : project.archived)
        .sort((a, b) => b.pinned - a.pinned || new Date(b.creationDate) - new Date(a.creationDate));


    //Pour supprimer un projet
    const deleteProject = async (projectId) => {
        // console.log("Suppression du projet avec l'ID:", projectId);
        try {
            const url = `${ipString}/projects/deleteProject/${projectId}`;
            // console.log("URL de suppression:", url);
            const response = await fetch(url, { method: 'DELETE' });
            const data = await response.json();
            // console.log("Réponse de la suppression:", data);
    
            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Projet supprimé avec succès'
                });
                fetchProjects();
                return Promise.resolve();  // Resolve promise on success
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message || 'Une erreur est survenue lors de la suppression du projet'
                });
                return Promise.reject();  // Reject promise on failure
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du projet:", error);
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la suppression du projet'
            });
            return Promise.reject();  // Reject promise on error
        }
    };
    




    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <IconButton
                    style={styles.iconButtonLeft}
                    onPress={() => navigation.navigate('TabNavigator', { screen: 'TutoStack', params: { screen: 'WhereToStartScreen' } })}
                    iconName="info-circle"
                />
                <LogoTransparent />
                <IconButton
                    style={styles.iconButtonRight}
                    onPress={() => toggleModal(setIsShowFilterModal, isShowFilterModal)}
                    iconName="filter"
                />
            </View>
            <View style={styles.biggerContainer}>
                <View style={styles.titleContainer}>
                    <ScreenTitle style={styles.ScreenTitle} text="Mes projets" />
                    <TouchableOpacity style={styles.nouveauBtn} onPress={() => navigation.navigate('NewProjectScreen')}>
                        <Text>Nouveau</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.biggerScrollContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                {filteredProjects.map((project) => {
                    const imageUrl = `${ipString}/assets/${project.picture}`;
                    // console.log(`Image URL for project ${project._id}: ${imageUrl}`); 
                    return (
                        <ProjectCard
                            key={project._id}
                            imageSrc={{ uri: imageUrl }}
                            title={project.name}
                            archived={project.archived}
                            pinned={project.pinned}
                            toggleArchived={() => toggleArchived(project._id, project.archived)}
                            togglePinned={() => togglePinned(project._id, project.pinned)}
                            deleteProject={() => deleteProject(project._id)}
                            projectId={project._id} 
                        />
                    );
                })}
                </ScrollView>
            </View>
            <SimpleModal 
                isShow={isShowFilterModal} 
                toggleModal={() => toggleModal(setIsShowFilterModal, isShowFilterModal)}
                title="Filtres"
                button1={
                    showAllProjects ? 
                    <FilledButton 
                        text='📚 Tous mes projets' 
                        background={colors.primary} 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowFilterModal, isShowFilterModal, handleShowAllProjects)}
                    /> :
                    <PlainButton 
                        text='📚 Tous mes projets' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowFilterModal, isShowFilterModal, handleShowAllProjects)}
                    />
                }
                button2={
                    showArchivedProjects ? 
                    <FilledButton 
                        text='📦 Archives' 
                        background={colors.primary} 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowFilterModal, isShowFilterModal, handleShowArchivedProjects)}
                    /> :
                    <PlainButton 
                        text='📦 Archives' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowFilterModal, isShowFilterModal, handleShowArchivedProjects)}
                    />
                }
            />
        </SafeAreaView>
    );
}

export default ProjectsScreen;

const createStyles = (colors) => StyleSheet.create({
    safeArea: {
        flex: 1,
        width: "100%",
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        position: 'relative',
    },
    iconButtonLeft: {
        position: 'absolute', 
        left: 25, 
        top: '50%', 
        marginTop: -25, 
    },
    iconButtonRight: {
        position: 'absolute', 
        right: 20, 
        top: '50%', 
        marginTop: -25, 
    },
    biggerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 50,
    },
    titleContainer: {
        display: 'flex',
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap', // Permet de réorganiser les éléments si nécessaire
        justifyContent: 'space-between', // Ajout pour séparer les éléments
    },
    nouveauBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#299D8E',
        borderRadius: 8,
        height: 25,
        width: 64,
    },
    biggerScrollContainer: {
        flex: 1,
    },
    scrollContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    btn: {
        width: '90%',
        margin: 'auto',
        marginVertical: 5,
    },
});
