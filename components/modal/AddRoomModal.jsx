import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { MyLightTheme } from '../Theme';
import Toast from 'react-native-toast-message';

const rooms = [
    "Balcon",
    "Buanderie",
    "Bureau",
    "Cave",
    "Chambre",
    "Cuisine",
    "Entrée",
    "Garage",
    "Grenier/Combles",
    "Jardin",
    "Salle à manger",
    "Salle de bain"
];

const AddRoomModal = ({ isShow, toggleModal, onSave, initialRoomCounts }) => {
    const { colors } = useTheme();
    const [roomCounts, setRoomCounts] = useState(rooms.reduce((acc, room) => ({ ...acc, [room]: 0 }), {}));

    useEffect(() => {
        setRoomCounts({ ...roomCounts, ...initialRoomCounts });
    }, [initialRoomCounts]);

    const handleIncrement = (room) => {
        const totalRooms = Object.values(roomCounts).reduce((a, b) => a + b, 0);

        if (totalRooms >= 18) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Vous ne pouvez pas avoir plus de 18 pièces au total.'
            });
            return;
        }

        if (room === 'Grenier/Combles' && roomCounts[room] >= 1) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Vous ne pouvez avoir qu\'un seul grenier.'
            });
            return;
        }

        setRoomCounts(prevState => {
            const newCount = Math.min(prevState[room] + 1, 9);
            return { ...prevState, [room]: newCount };
        });
    };

    const handleDecrement = (room) => {
        setRoomCounts(prevState => {
            const newCount = Math.max(prevState[room] - 1, 0);
            return { ...prevState, [room]: newCount };
        });
    };

    const handleClose = () => {
        onSave(roomCounts);
        toggleModal();
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isShow}
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={handleClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modal, { backgroundColor: colors.modalBackgroundColor }]}>
                            <View style={styles.textLine}>
                                <Text style={styles.modalTitle}>Ajouter une pièce</Text>
                                <TouchableOpacity onPress={handleClose}>
                                    <Entypo name='cross' size={40} color={colors.deepGrey} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.roomsContainer}>
                                {rooms.map((room) => (
                                    <View key={room} style={styles.roomRow}>
                                        <TouchableOpacity onPress={() => handleDecrement(room)} style={styles.iconContainer}>
                                            <FontAwesome
                                                name="minus-circle"
                                                size={20}
                                                color={roomCounts[room] > 0 ? colors.lightGreen : colors.grey}
                                            />
                                        </TouchableOpacity>
                                        <View style={[
                                            styles.roomNameContainer,
                                            { borderColor: roomCounts[room] > 0 ? colors.lightGreen : colors.grey }
                                        ]}>
                                            <Text style={styles.roomName}>{room}</Text>
                                            {roomCounts[room] > 0 && (
                                                <View style={styles.counter}>
                                                    <Text style={styles.counterText}>{roomCounts[room]}</Text>
                                                </View>
                                            )}
                                        </View>
                                        <TouchableOpacity onPress={() => handleIncrement(room)} style={styles.iconContainer}>
                                            <FontAwesome
                                                name="plus-circle"
                                                size={20}
                                                color={roomCounts[room] > 0 ? colors.orange : colors.grey}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

AddRoomModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    initialRoomCounts: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingTop: 80,
    },
    modal: {
        width: '90%',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    textLine: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#194852',
    },
    roomsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    roomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    roomNameContainer: {
        display: 'flex',
        width: 150,
        height: 23,
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        borderWidth: 1,
        borderRadius: 8, // Rayon de bordure de 8px
        color: MyLightTheme.colors.deepGrey,
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 19, 
        letterSpacing: 0.15,
        position: 'relative',
        marginHorizontal: 10,
    },
    roomName: {
        textAlign: 'center',
        color: MyLightTheme.colors.deepGrey,
    },
    counter: {
        position: 'absolute',
        top: -14, // position du compteur
        right: -12, // position du compteur
        width: 25, // taille du compteur
        height: 25, // taille du compteur
        borderRadius: 30, // aspect rond du compteur
        backgroundColor: MyLightTheme.colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        color: '#FFF',
        fontSize: 16, // Doublé
        fontWeight: '800',
    },
    iconContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddRoomModal;
