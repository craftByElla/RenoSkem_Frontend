import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, SafeAreaView as SafeAreaViewIOS } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import ScreenTitle from '../../components/text/ScreenTitle';
import Toast from 'react-native-toast-message';
const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

const ipString = process.env.IP_ADDRESS;

function RoomsScreen({ navigation, route }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const dispatch = useDispatch();
    const { projectId } = route.params;
    const [projectImage, setProjectImage] = useState(null);

    useFocusEffect(
        useCallback(() => {
            console.log("test");
        }, [])
    );

   

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.main}>
                <View style={styles.biggerContainer}>
                    <View style={styles.titleContainer}>
                        <ScreenTitle style={styles.screenTitle} text="Périmètre" />
                        <TouchableOpacity style={styles.addBtn} onPress={() => console.log("click sur ajouter une pièce")}>
                            <Text>Ajouter une pièce</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.fondVert}>
                <View style={styles.recapContainer}>
                    <ScreenTitle style={styles.recapTitle} text="Récapitulatif" />
                </View>
            </View>
            {projectImage && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: projectImage }} style={styles.image} />
                </View>
            )}
        </SafeAreaView>
    );
}

export default RoomsScreen;

const createStyles = (colors) => StyleSheet.create({
    main: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
    addBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#299D8E',
        borderRadius: 8,
        height: 25,
        width: '40%', // Utiliser un pourcentage pour une meilleure adaptabilité
    },
    fondVert: {
        display: 'flex',
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'rgba(41, 157, 142, 0.2)',
        paddingTop: 20,
        alignItems: 'center', // Centre le contenu horizontalement
    },
    recapContainer: {
        width: '80%', // Définit la largeur à 80%
    },
    recapTitle: {

    },
});
