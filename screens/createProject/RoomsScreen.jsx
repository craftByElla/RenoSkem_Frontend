import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, SafeAreaView as SafeAreaViewIOS } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import ScreenTitle from '../../components/text/ScreenTitle';
import Toast from 'react-native-toast-message';
import RoomsDisplay from '../../components/cards/RoomsDisplay';
import AddRoomModal from '../../components/modal/AddRoomModal';
import RoomDetailsModal from '../../components/modal/RoomDetailsModal';

const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

const ipString = process.env.IP_ADDRESS;

function RoomsScreen({ navigation, route }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const dispatch = useDispatch();
    const { projectId } = route.params;
    const [rooms, setRooms] = useState([]);
    const [isAddRoomModalVisible, setAddRoomModalVisible] = useState(false);

    //Etat pour gérer la visibilité de la modale et l'ID de la pièce actuellement sélectionnée.
    const [isRoomDetailsModalVisible, setRoomDetailsModalVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    // Fetch rooms by project
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const url = `${ipString}/rooms/getRoomsByProject/${projectId}`;
                // console.log('Fetching rooms data from URL:', url); // Ligne de débogage
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    // console.log('Rooms data:', data); // Ligne de débogage
                    setRooms(data.rooms);
                } else {
                    // console.error('Error response from server:', data); // Ligne de débogage
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: data.message || 'Une erreur est survenue lors de la récupération des pièces'
                    });
                }
            } catch (error) {
                // console.error('Error fetching rooms:', error); // Ligne de débogage
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Une erreur est survenue lors de la récupération des pièces'
                });
            }
        };

        fetchRooms();
    }, [projectId]);

    const toggleAddRoomModal = () => {
        setAddRoomModalVisible(!isAddRoomModalVisible);
    };

    const handleSaveRooms = async (roomCounts) => {
        // console.log('Saving rooms:', roomCounts); // Ligne de débogage
        try {
            const response = await fetch(`${ipString}/rooms/updateRooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectId, rooms: roomCounts }),
            });
            const data = await response.json();

            if (response.ok) {
                // console.log('Updated rooms data:', data); // Ligne de débogage
                setRooms(data.rooms);
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Les pièces ont été mises à jour avec succès'
                });
            } else {
                // console.error('Error response from server:', data); // Ligne de débogage
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message || 'Une erreur est survenue lors de la mise à jour des pièces'
                });
            }
        } catch (error) {
            // console.error('Error updating rooms:', error); // Ligne de débogage
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la mise à jour des pièces'
            });
        }
    };

    //fonction au composant RoomsDisplay pour qu'il puisse ouvrir la modale et transmettre l'ID de la pièce.
    const handleRoomPress = (roomId) => {
        setSelectedRoomId(roomId);
        setRoomDetailsModalVisible(true);
    };

    const handleSaveRoomDetails = (name, surface, roomId) => {
        // Logique de sauvegarde des détails de la pièce
        console.log('Saving room details:', { name, surface, roomId });
        setRoomDetailsModalVisible(false);
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.main}>
                <View style={styles.biggerContainer}>
                    <View style={styles.titleContainer}>
                        <ScreenTitle style={styles.screenTitle} text="Périmètre" />
                        <TouchableOpacity style={styles.addBtn} onPress={toggleAddRoomModal}>
                            <Text>Ajouter une pièce</Text>
                        </TouchableOpacity>
                    </View>
                    {rooms.length > 0 ? (
                        <RoomsDisplay rooms={rooms} onRoomPress={handleRoomPress} />
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.tentIcon}>🏕️</Text>
                        </View>
                    )}
                </View>
            </View>
            {rooms.length > 0 && (
                <View style={styles.fondVert}>
                    <View style={styles.recapContainer}>
                        <ScreenTitle style={styles.recapTitle} text="Récapitulatif" />
                    </View>
                </View>
            )}
            <AddRoomModal
                isShow={isAddRoomModalVisible}
                toggleModal={toggleAddRoomModal}
                onSave={handleSaveRooms}
                initialRoomCounts={rooms.reduce((acc, room) => {
                    acc[room.type] = (acc[room.type] || 0) + 1;
                    return acc;
                }, {})}
            />
            <RoomDetailsModal
                isShow={isRoomDetailsModalVisible}
                toggleModal={() => setRoomDetailsModalVisible(false)}
                onSave={handleSaveRoomDetails}
                roomId={selectedRoomId}
            />
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
    imageContainer: {
        position: 'absolute',
        top: 50,
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
        left: '50%',
        marginLeft: -(80 / 2), // Centrer horizontalement
        borderRadius: 40, // La moitié de la dimension pour rendre le conteneur circulaire
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    emptyContainer: {
        marginTop:100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tentIcon: {
        fontSize: 150, 
    }
    
});
