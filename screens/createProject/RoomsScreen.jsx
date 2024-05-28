import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, SafeAreaView as SafeAreaViewIOS } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import ScreenTitle from '../../components/text/ScreenTitle';
import Toast from 'react-native-toast-message';
import RoomsDisplay from '../../components/cards/RoomsDisplay';
import AddRoomModal from '../../components/modal/AddRoomModal';
import RoomDetailsModal from '../../components/modal/RoomDetailsModal';
import CardRoomDetails from '../../components/cards/CardRoomDetails';
import IconButton from "../../components/buttons/IconButton";
import FilterModal from '../../components/modal/FilterModal';


const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

const ipString = process.env.IP_ADDRESS;

function RoomsScreen({ navigation, route }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { projectId } = route.params;
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [workTypes, setWorkTypes] = useState([]);
    const [isAddRoomModalVisible, setAddRoomModalVisible] = useState(false);
    const [isRoomDetailsModalVisible, setRoomDetailsModalVisible] = useState(false);
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [roomDetails, setRoomDetails] = useState(null);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [filters, setFilters] = useState({ roomTypes: [], workTypes: [] });

    //pour recharger l'affichage après la suppression d'une pièce
    const [reload, setReload] = useState(false);
    //pour mettre à jour le compteur dans la modale AddRoomModal après une suppresion
    const [initialRoomCounts, setInitialRoomCounts] = useState({});

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const url = `${ipString}/rooms/getRoomsByProject/${projectId}`;
                const response = await fetch(url);
                const data = await response.json();
    
                if (response.ok) {
                    setRooms(data.rooms);
                    setFilteredRooms(data.rooms);
                    const roomCounts = data.rooms.reduce((acc, room) => {
                        acc[room.type] = (acc[room.type] || 0) + 1;
                        return acc;
                    }, {});
                    setInitialRoomCounts(roomCounts);
    
                    const roomTypesSet = new Set();
                    const workTypesSet = new Set();
                    data.rooms.forEach(room => {
                        roomTypesSet.add(room.type);
                        room.items.forEach(item => {
                            workTypesSet.add(item.field);
                        });
                    });
    
                    setRoomTypes([...roomTypesSet]);
                    setWorkTypes([...workTypesSet]);
                    setFilters({ roomTypes: [...roomTypesSet], workTypes: [...workTypesSet, 'Sans type'] });
    
                    console.log("Rooms fetched: ", data.rooms);
                    console.log("Room types: ", [...roomTypesSet]);
                    console.log("Work types: ", [...workTypesSet]);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: data.message || 'Une erreur est survenue lors de la récupération des pièces'
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Une erreur est survenue lors de la récupération des pièces'
                });
            }
        };
    
        fetchRooms();
    }, [projectId, reload]);
    

     //Toggle des modales
     const toggleAddRoomModal = () => {
        setAddRoomModalVisible(!isAddRoomModalVisible);
    };
    const toggleFilterModal = () => {
        setFilterModalVisible(!isFilterModalVisible);
    };

    //Gestion filtres
    const applyFilters = (selectedFilters) => {
        const { roomTypes, workTypes } = selectedFilters;
        setFilters(selectedFilters);
    
        const filteredRooms = rooms.filter(room => {
            const roomTypeMatch = roomTypes.length === 0 || roomTypes.includes(room.type);
            const workTypeMatch = workTypes.includes('Sans type') ? (room.items.length === 0 || room.items.some(item => workTypes.includes(item.field))) : room.items.some(item => workTypes.includes(item.field));
    
            return roomTypeMatch && workTypeMatch;
        });
    
        setFilteredRooms(filteredRooms);
    
        console.log("Filters applied: ", selectedFilters);
        console.log("Filtered rooms: ", filteredRooms);
    };
    
    
   
    const handleSaveRooms = async (roomCounts) => {
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
                setRooms(data.rooms);
                setInitialRoomCounts(roomCounts);
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Les pièces ont été mises à jour avec succès'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message || 'Une erreur est survenue lors de la mise à jour des pièces'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la mise à jour des pièces'
            });
        }
    };

    const handleRoomPress = async (roomId) => {
        setSelectedRoomId(roomId);
        try {
            const response = await fetch(`${ipString}/rooms/getRoom/${roomId}`);
            const data = await response.json();
            if (response.ok) {
                setRoomDetails(data.room);
                setRoomDetailsModalVisible(true);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message || 'Une erreur est survenue lors de la récupération des détails de la pièce'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la récupération des détails de la pièce'
            });
        }
    };

    const handleSaveRoomDetails = async (name, surface, items, comment, roomId) => {
        
        //Pour gérer une addition ou modification. La route regarde d'abord si l'item existe déjà si oui elle le crée sinon elle le modifie
        const itemsToAdd = items.map(item => ({
            field: item.field,
            difficulty: item.difficulty
        }));

        //Pour gérer une suppression
        const currentItems = roomDetails.items || [];
        const itemsToRemove = currentItems.filter(ci => !items.some(item => item.field === ci.field)).map(ci => ci.field);
    
        try {
            const response = await fetch(`${ipString}/rooms/editRoom`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomId, name, surface, comment, itemsToAdd, itemsToRemove, itemsToModify: itemsToAdd }),
            });
            const data = await response.json();
    
            if (response.ok) {
                setRooms(prevRooms => prevRooms.map(room => room._id === roomId ? data.room : room));
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Les détails de la pièce ont été mis à jour avec succès'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message || 'Une erreur est survenue lors de la mise à jour des détails de la pièce'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la mise à jour des détails de la pièce'
            });
        }
    };
    
    
    
    
    

    const handleRoomDeleted = (deletedRoomId) => {
        setRooms((prevRooms) => {
            const updatedRooms = prevRooms.filter((room) => room._id !== deletedRoomId);
            const roomType = prevRooms.find((room) => room._id === deletedRoomId).type;
            
            setInitialRoomCounts((prevCounts) => ({
                ...prevCounts,
                [roomType]: Math.max((prevCounts[roomType] || 0) - 1, 0)
            }));
            
            return updatedRooms;
        });
        setRoomDetailsModalVisible(false);
        setReload(prev => !prev); // Inverse la valeur de reload pour déclencher useEffect
    };
    
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                            <View style={styles.recapTitle}>
                                <ScreenTitle  text="Récapitulatif" />
                                <IconButton
                                    style={styles.iconButtonRight}
                                    onPress={toggleFilterModal}
                                    iconName="filter"
                                />
                            </View>
                            {filteredRooms.map(room => (
                                <CardRoomDetails key={room._id} room={room} onPress={() => handleRoomPress(room._id)} />
                            ))}
                        </View>
                    </View>
                )}
                <AddRoomModal
                    isShow={isAddRoomModalVisible}
                    toggleModal={toggleAddRoomModal}
                    onSave={handleSaveRooms}
                    initialRoomCounts={initialRoomCounts}
                />
                {isRoomDetailsModalVisible && selectedRoomId && (
                    <RoomDetailsModal
                        isShow={isRoomDetailsModalVisible}
                        toggleModal={() => setRoomDetailsModalVisible(false)}
                        onSave={handleSaveRoomDetails}
                        roomId={selectedRoomId}
                        roomDetails={roomDetails}
                        onRoomDeleted={handleRoomDeleted}
                    />
                )}
                <FilterModal
                    isVisible={isFilterModalVisible}
                    onClose={toggleFilterModal}
                    onApplyFilters={applyFilters}
                    roomTypes={roomTypes}
                    workTypes={workTypes}
                    currentFilters={filters}
                />
            </ScrollView>
        </SafeAreaView>
    );
    
}

export default RoomsScreen;

const createStyles = (colors) => StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
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
        justifyContent: 'space-between',
    },
    addBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#299D8E',
        borderRadius: 8,
        height: 25,
        width: '40%',
    },
    fondVert: {
        display: 'flex',
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'rgba(41, 157, 142, 0.2)',
        paddingTop: 20,
        alignItems: 'center',
    },
    recapContainer: {
        width: '80%',
        
    },
    recapTitle: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        marginLeft: -(80 / 2),
        borderRadius: 40,
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    emptyContainer: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tentIcon: {
        fontSize: 150,
    },
});
