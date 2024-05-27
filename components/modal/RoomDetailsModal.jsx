import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { MyLightTheme } from '../Theme';

const RoomDetailsModal = ({ isShow, toggleModal, onSave, roomId }) => {
    const { colors } = useTheme();
    const [name, setName] = useState('');
    const [surface, setSurface] = useState('');

    const handleSave = () => {
        onSave(name, surface, roomId);
        toggleModal();
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isShow}
            onRequestClose={toggleModal}
        >
            <TouchableWithoutFeedback onPress={toggleModal}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modal, { backgroundColor: colors.modalBackgroundColor }]}>
                            <View style={styles.textLine}>
                                <Text style={styles.modalTitle}>Détails de la pièce</Text>
                                <TouchableOpacity onPress={toggleModal}>
                                    <Entypo name='cross' size={40} color={colors.deepGrey} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.roomDetailContainer}>
                                <TouchableOpacity style={styles.iconContainer}>
                                    <FontAwesome name="close" size={20} color={colors.orange} />
                                </TouchableOpacity>
                                <TextInput
                                    style={[
                                        styles.input,
                                        { borderColor: name ? colors.lightGreen : colors.grey }
                                    ]}
                                    placeholder="Nom de la pièce"
                                    placeholderTextColor={colors.grey}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                            <View style={styles.roomDetailContainer}>
                                <Text style={styles.surfaceText}>Surface de la pièce ►</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        { borderColor: surface ? colors.lightGreen : colors.grey }
                                    ]}
                                    placeholder="m2"
                                    placeholderTextColor={colors.grey}
                                    value={surface}
                                    onChangeText={setSurface}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.roomDetailContainer}>
                                <Text style={styles.renovationText}>Définissez les rénovations ▼</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

RoomDetailsModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    roomId: PropTypes.string.isRequired,
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
    roomDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 222,
        height: 40,
        borderWidth: 1.5,
        borderRadius: 8,
        textAlign: 'center',
        color: '#194852',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 19,
        letterSpacing: 0.15,
    },
    surfaceText: {
        color: '#6F797B',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0.15,
        marginRight: 10,
    },
    renovationText: {
        color: '#6F797B',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0.15,
    },
});

export default RoomDetailsModal;
