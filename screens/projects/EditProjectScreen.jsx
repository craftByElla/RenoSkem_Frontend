import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Keyboard, SafeAreaView, Platform, TouchableOpacity, Image, KeyboardAvoidingView, Text } from 'react-native';
import IconButton from "../../components/buttons/IconButton";
import ScreenTitle from "../../components/text/ScreenTitle";
import ProjectPicture from "../../components/images/ProjectPicture";
import CustomInput from "../../components/inputs/CustomInput";
import LogoTransparent from '../../components/logos/LogoTransparent';
import FilledButton from '../../components/buttons/FilledButton';
import Toast from 'react-native-toast-message';
import ProjectIconSelectorModal from '../../components/modal/ProjectIconSelectorModal';
import { useSelector } from 'react-redux';
import CommentModal from '../../components/modal/CommentModal';
import { useRoute } from '@react-navigation/native';

const ipString = process.env.IP_ADDRESS;

function EditProjectScreen({ navigation }) {
    // Récupère le token utilisateur à partir de l'état global (Redux)
    const userToken = useSelector((state) => state.user.userInfos.token);
    // Récupère les paramètres de la route, y compris projectId
    const route = useRoute();
    const { projectId } = route.params;

    // Déclaration des états pour stocker les valeurs des champs du formulaire
    const [name, setName] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [picture, setPicture] = useState(null);
    const [comment, setComment] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCommentModalVisible, setCommentModalVisible] = useState(false);

    // Utilise useEffect pour récupérer les détails du projet lors du montage du composant
    useEffect(() => {
        const fetchProjectDetails = async () => {
            // console.log("projectId:", projectId);
            

            try {
                // Effectue une requête GET pour récupérer les détails du projet
                const response = await fetch(`${ipString}/projects/getProject/${projectId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                });
                const data = await response.json();

                // console.log("Response status:", response.status);
                // console.log("Response data:", data);

                // Si la réponse est OK, met à jour les états avec les détails du projet
                if (response.ok) {
                    setName(data.project.name);
                    setBudget(data.project.budget.toString());
                    setLocation(data.project.location);
                    setPicture(data.project.picture ? { uri: data.project.picture } : null);
                    setComment(data.project.comment);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: data.message || 'Une erreur est survenue lors de la récupération du projet'
                    });
                }
            } catch (error) {
                console.log("Fetch error:", error);
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Une erreur est survenue lors de la récupération du projet'
                });
            }
        };

        // Appelle la fonction pour récupérer les détails du projet
        fetchProjectDetails();
    }, [projectId, userToken]);

    // Fonction pour gérer l'enregistrement des modifications
    const handleSave = () => {
        // Vérifie que le nom du projet n'est pas vide
        if (!name ) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Le nom du projet est obligatoire'
            });
            return;
        }

        // Prépare les données du projet à mettre à jour
        const updatedProjectData = {
            name,
            budget: parseFloat(budget),
            location,
            picture: picture ? picture.uri : null,
            comment,
        };

        // console.log("Updated project data:", updatedProjectData);

        // Effectue une requête PUT pour mettre à jour le projet
        fetch(`${ipString}/projects/editproject/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify(updatedProjectData),
        })
        .then(response => {
            // console.log("Response status:", response.status);
            return response.json();
        })
        .then(data => {
            // console.log("Response data:", data);
            if (data.message === 'Project profile updated successfully') {
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Projet mis à jour avec succès'
                });
                navigation.navigate('Projets', { screen: 'ProjectsScreen' });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message
                });
            }
        })
        .catch((error) => {
            // console.log("Update error:", error);
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la mise à jour du projet'
            });
        });
    };

    // Fonction pour gérer la sélection de l'image
    const handleImageSelect = (image) => {
        setPicture(image);
    };

    // Fonction pour basculer la visibilité de la modale de sélection d'image
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Fonction pour basculer la visibilité de la modale de commentaire
    const toggleCommentModal = () => {
        setCommentModalVisible(!isCommentModalVisible);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 80}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView 
                        contentContainerStyle={styles.scrollContainer}
                        contentInsetAdjustmentBehavior="automatic"
                    >
                        <View style={styles.innerContainer}>
                            <View style={styles.header}>
                                <IconButton
                                    style={styles.iconButtonLeft}
                                    onPress={() => navigation.navigate('ProjectsScreen')}
                                    iconName="long-arrow-left"
                                />
                                <LogoTransparent />
                                <IconButton
                                    style={styles.iconButtonRight}
                                    onPress={handleSave}
                                    iconName="save"
                                />
                            </View>
                            <View style={styles.titleContainer}>
                                <ScreenTitle style={styles.ScreenTitle} text="Modifier mon projet" />
                            </View>
                            <View style={styles.ProjectPictureWrapper}>
                                <TouchableOpacity onPress={toggleModal}>
                                    <View style={styles.pictureWrapper}>
                                        {picture ? (
                                            <Image source={picture} style={styles.picture} />
                                        ) : (
                                            <ProjectPicture />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputContainer}>
                                <CustomInput 
                                    placeholder="Nom du projet" 
                                    value={name} 
                                    onChangeText={setName} 
                                />
                                <CustomInput 
                                    placeholder="Localisation du bien" 
                                    value={location} 
                                    onChangeText={setLocation} 
                                />
                                <CustomInput 
                                    placeholder="Budget" 
                                    value={budget} 
                                    onChangeText={setBudget} 
                                    validationRegex={/^\d+(\.\d{1,2})?$/} 
                                    suffix="€" 
                                />
                                {comment ? (
                                    <View style={styles.commentContainer}>
                                        <Text style={styles.commentText}>{comment}</Text>
                                    </View>
                                ) : null}
                            </View>
                            <View style={styles.buttonContainer}>
                               <FilledButton
                                    text={comment ? 'Modifier le commentaire' : 'Ajouter un commentaire'}
                                    background="#194852"
                                    full={true}
                                    onPress={toggleCommentModal}
                                    style={styles.commentButton}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
                <ProjectIconSelectorModal 
                    isShow={isModalVisible} 
                    toggleModal={toggleModal} 
                    onSelectImage={handleImageSelect} 
                />
                <CommentModal
                    isShow={isCommentModalVisible}
                    toggleModal={toggleCommentModal}
                    comment={comment}
                    onSave={(newComment) => {
                        setComment(newComment);
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: "100%",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        position: 'relative',
        marginBottom: 30,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButtonLeft: {
        position: 'absolute', 
        left: 25, 
        top: '50%', 
        marginTop: -25, 
    },
    iconButtonRight: {
        position: 'absolute', 
        right: 25, 
        top: '50%', 
        marginTop: -25, 
    },
    ProjectPictureWrapper: {
        marginTop: 10,
        marginBottom: 10,
    },
    pictureWrapper: {
        borderWidth: 1,
        borderColor: 'rgba(41, 157, 142, 1)',
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderRadius: 70, 
        overflow: 'hidden', 
    },
    picture: {
        width: 140,
        height: 140,
        borderRadius: 70,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        flexGrow: 1,
    },
    commentContainer: {
        width: '85%',
        marginVertical: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#D5CDD2',
        borderRadius: 4,
    },
    commentText: {
        color: '#000',
        fontSize: 16,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    commentButton: {
        width: '80%',  
        alignSelf: 'center',
    },
    
});

export default EditProjectScreen;
