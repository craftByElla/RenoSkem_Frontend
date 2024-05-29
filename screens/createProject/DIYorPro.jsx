import React, { useState, useEffect,  useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, SafeAreaView as SafeAreaViewIOS } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import ScreenTitle from '../../components/text/ScreenTitle';
import Toast from 'react-native-toast-message';
import RoomsDisplayDIYPRO from '../../components/cards/RoomsDisplayDIYPRO';
import CardRoomDetailsDIYPRO from '../../components/cards/CardRoomDetailsDIYPRO';

import IconButton from "../../components/buttons/IconButton";
import FilterModalDIYPRO from '../../components/modal/FilterModalDIYPRO';

const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

const ipString = process.env.IP_ADDRESS;

function DIYorProScreen({ navigation, route }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { projectId } = route.params;
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [workTypes, setWorkTypes] = useState([]);
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [filters, setFilters] = useState({ roomTypes: [], workTypes: [], diy: 'Voir tout' });

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const url = `${ipString}/rooms/getRoomsByProject/${projectId}`;
                const response = await fetch(url);
                const data = await response.json();
    
                if (response.ok) {
                    setRooms(data.rooms);
                    setFilteredRooms(data.rooms);
    
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
                    setFilters({ roomTypes: [...roomTypesSet], workTypes: [...workTypesSet, 'Sans type'], diy: 'Voir tout' });
    
                    // console.log("Rooms fetched: ", data.rooms);
                    // console.log("Room types: ", [...roomTypesSet]);
                    // console.log("Work types: ", [...workTypesSet]);
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
    }, [projectId]);

    useFocusEffect(
        useCallback(() => {
            reloadRooms();
        }, [projectId])
    );

        const reloadRooms = async () => {
        try {
            const url = `${ipString}/rooms/getRoomsByProject/${projectId}`;
            const response = await fetch(url);
            const data = await response.json();
    
            if (response.ok) {
                setRooms(data.rooms);
                setFilteredRooms(data.rooms);
    
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
                setFilters({ roomTypes: [...roomTypesSet], workTypes: [...workTypesSet, 'Sans type'], diy: 'Voir tout' });
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

    const toggleFilterModal = () => {
        setFilterModalVisible(!isFilterModalVisible);
    };

    const applyFilters = (selectedFilters) => {
        const { roomTypes, workTypes, diy } = selectedFilters;
        setFilters(selectedFilters);
    
        const filteredRooms = rooms.filter(room => {
            const roomTypeMatch = roomTypes.length === 0 || roomTypes.includes(room.type);
            const workTypeMatch = workTypes.includes('Sans type') ? (room.items.length === 0 || room.items.some(item => workTypes.includes(item.field))) : room.items.some(item => workTypes.includes(item.field));
            const diyMatch = diy === 'Voir tout' || (diy === 'DIY' && room.items.some(item => item.diy)) || (diy === 'PRO' && room.items.some(item => !item.diy));
    
            return roomTypeMatch && workTypeMatch && diyMatch;
        });
    
        setFilteredRooms(filteredRooms);
    
        // console.log("Filters applied: ", selectedFilters);
        // console.log("Filtered rooms: ", filteredRooms);
    };

    const handleRoomPress = (roomId) => {
        // console.log(`Click on room with id: ${roomId}`);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.main}>
                    <View style={styles.biggerContainer}>
                        <View style={styles.titleContainer}>
                            <ScreenTitle style={styles.screenTitle} text="DIY ou PRO ?" />
                        </View>
                        {rooms.length > 0 ? (
                            <RoomsDisplayDIYPRO rooms={rooms} onRoomPress={handleRoomPress} />
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
                                <CardRoomDetailsDIYPRO key={room._id} room={room} onPress={() => handleRoomPress(room._id)} />
                            ))}
                        </View>
                    </View>
                )}
                <FilterModalDIYPRO
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

export default DIYorProScreen;

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
    emptyContainer: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tentIcon: {
        fontSize: 150,
    },
});
