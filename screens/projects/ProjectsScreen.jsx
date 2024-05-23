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
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
const ipString = process.env.IP_ADDRESS;

function ProjectsScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [isShowFilterModal, setIsShowFilterModal] = useState(false);
    const userToken = useSelector((state) => state.user.userInfos.token);
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const url = `${ipString}/projects/getUserProjects/${userToken}`;
            // console.log("URL:", url);
            const response = await fetch(url);
            const data = await response.json();
            // console.log("Response data:", data);

            if (response.ok) {
                // console.log("Projects retrieved successfully:", data.projects);
                setProjects(data.projects);
            } else {
                // console.log("Error in response:", data.message);
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message || 'Une erreur est survenue lors de la récupération des projets'
                });
            }
        } catch (error) {
            // console.error("Fetch error:", error);
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

    const handleButtonPress = (setIsShowModal, isShowModal, action) => {
        toggleModal(setIsShowModal, isShowModal);
        action();
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
                    {projects.map((project) => (
                        <ProjectCard key={project._id} imageSrc={{ uri: project.picture }} title={project.name} />
                    ))}
                </ScrollView>
            </View>
            <SimpleModal 
                isShow={isShowFilterModal} 
                toggleModal={() => toggleModal(setIsShowFilterModal, isShowFilterModal)}
                title="Filtres"
                button1={
                    <PlainButton 
                        text='Ordre chronologique' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowFilterModal, isShowFilterModal, () => console.log('Ordre chronologique'))}
                    />
                }
                button2={
                    <PlainButton 
                        text='Fichier archivé' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(setIsShowFilterModal, isShowFilterModal, () => console.log('Fichier archivé'))}
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
    btn: {
        width: '90%',
        margin: 'auto',
    },
});
