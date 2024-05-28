import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { MyLightTheme } from '../../components/Theme';
import Toast from 'react-native-toast-message';

// Composant DeleteButton
const DeleteButton = ({ onPress, text, style, onLongPress }) => {
    // Déclare un état pour suivre la progression de l'appui long
    const [progress, setProgress] = useState(0);
    // Déclare un état pour stocker l'identifiant de l'intervalle
    const [intervalId, setIntervalId] = useState(null);

    // Utilise un effet pour surveiller les changements de la progression
    useEffect(() => {
        // Si la progression atteint 100%, arrête l'intervalle et appelle onLongPress
        if (progress === 100) {
            clearInterval(intervalId); // Arrête l'intervalle
            if (onLongPress) onLongPress(); // Appelle la fonction onLongPress si elle est définie
        }
    }, [progress]); // Exécute cet effet à chaque changement de la progression

    // Fonction appelée lors de l'appui long sur le bouton
    const handleLongPress = () => {
        setProgress(0); // Réinitialise la progression à 0
        // Démarre un intervalle qui met à jour la progression toutes les 50 millisecondes
        const id = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) { // Si la progression atteint 100%, arrête l'intervalle
                    clearInterval(id);
                    return 100;
                }
                return prev + 5; // Augmente la progression de 5
            });
        }, 25);
        setIntervalId(id); // Stocke l'identifiant de l'intervalle
    };

    // Fonction appelée lorsque l'utilisateur relâche le bouton
    const handlePressOut = () => {
        clearInterval(intervalId); // Arrête l'intervalle
        setProgress(0); // Réinitialise la progression à 0
    };

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={()=> Toast.show({
                    type: 'info',
                    text1: 'Long Press Required',
                    text2: 'Rester appuyé pour supprimer',
                    position: 'top',
                })} 
                onLongPress={handleLongPress} 
                onPressOut={handlePressOut}
            >
                <Text style={styles.text}>{text}</Text> 
            </TouchableOpacity>
            <View style={[styles.progressBar, { width: `${progress}%` }]} /> 
        </View>
    );
};

// Définit les types de propriétés pour le composant DeleteButton
DeleteButton.propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
    onLongPress: PropTypes.func,
};

// Styles pour le composant DeleteButton
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    button: {
        backgroundColor: MyLightTheme.colors.orange, // Utilise la couleur orange du thème
        borderRadius: 100,
        paddingVertical: 14,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Prend toute la largeur du parent
    },
    text: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 21,
        letterSpacing: 0.25,
    },
    progressBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 5,
        backgroundColor: 'red', // Barre de progression rouge vif
        borderRadius: 100,
    }
});

export default DeleteButton;
