import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import Hammers from '../../components/buttons/Hammers';
import TextWithRadioButtons from '../../components/buttons/TextWithRadioButtons';
import FilledButton from '../../components/buttons/FilledButton';

import { MyLightTheme } from '../Theme';

// Liste des postes de travaux
const postesTravaux = [
    "Chauffage",
    "Cloisonnement/Plâtrage",
    "Démolition",
    "Électricité",
    "Étanchéité",
    "Façade",
    "Fondations",
    "Installation cuisine/SDB",
    "Isolation",
    "Maçonnerie",
    "Menuiserie",
    "Montage de meuble",
    "Peinture",
    "Plomberie",
    "Revêtements muraux",
    "Revêtements sol",
    "Revêtements extérieurs",
    "Toiture",
    "Ventilation"
];

const RoomDetailsModal = ({ isShow, toggleModal, onSave, roomId }) => {
    const { colors } = useTheme();
    const [name, setName] = useState('');
    const [surface, setSurface] = useState('');
    const [selectedPoste, setSelectedPoste] = useState('');
    const [selectedPostes, setSelectedPostes] = useState([]);
    const [skills, setSkills] = useState(postesTravaux.reduce((acc, poste) => {
        acc[poste] = null;
        return acc;
    }, {}));
    const [comment, setComment] = useState('');
    const [isCommentModalVisible, setCommentModalVisible] = useState(false);

    const handleSave = () => {
        onSave(name, surface, roomId);
        toggleModal();
    };

    const handleAddPoste = () => {
        if (selectedPoste && !selectedPostes.includes(selectedPoste)) {
            setSelectedPostes([...selectedPostes, selectedPoste]);
            setSelectedPoste('');
        }
    };

    const handlePress = (index, value) => {
        const poste = selectedPostes[index];
        setSkills(prevSkills => ({
            ...prevSkills,
            [poste]: value
        }));
    };

    const toggleCommentModal = () => {
        setCommentModalVisible(!isCommentModalVisible);
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
                            <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                                            {
                                                borderColor: name ? colors.lightGreen : colors.grey,
                                                width: 250,
                                                marginLeft: 10,
                                            }
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
                                            {
                                                borderColor: surface ? colors.lightGreen : colors.grey,
                                                width: 120,
                                                marginLeft: 15,
                                            }
                                        ]}
                                        placeholder="m²"
                                        placeholderTextColor={colors.grey}
                                        value={surface}
                                        onChangeText={setSurface}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.roomDetailContainer}>
                                    <Text style={styles.renovationText}>Définissez les rénovations ▼</Text>
                                </View>
                                <View style={styles.hammersContainer}>
                                    <Hammers style={styles.hammers} />
                                </View>
                                <ScrollView style={styles.scrollableSection} contentContainerStyle={styles.scrollableContent}>
                                    {selectedPostes.map((poste, index) => (
                                        <TextWithRadioButtons
                                            key={index}
                                            text={poste}
                                            selectedButton={skills[poste]}
                                            handlePress={handlePress}
                                            index={index}
                                        />
                                    ))}
                                </ScrollView>
                                <TouchableOpacity style={styles.addButton} onPress={handleAddPoste}>
                                    <Text style={styles.addButtonText}>Ajouter</Text>
                                </TouchableOpacity>
                                <Picker
                                    selectedValue={selectedPoste}
                                    onValueChange={(itemValue) => setSelectedPoste(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Sélectionnez un poste" value="" />
                                    {postesTravaux.filter(poste => !selectedPostes.includes(poste)).map((poste, index) => (
                                        <Picker.Item key={index} label={poste} value={poste} />
                                    ))}
                                </Picker>
                                {comment ? (
                                    <View style={styles.commentContainer}>
                                        <Text style={styles.commentText}>{comment}</Text>
                                    </View>
                                ) : null}
                                <View style={styles.buttonContainer}>
                                    <FilledButton
                                        text={comment ? 'Modifier le commentaire' : 'Ajouter un commentaire'}
                                        background="#194852"
                                        full={true}
                                        onPress={toggleCommentModal}
                                        style={styles.commentButton}
                                    />
                                </View>
                            </ScrollView>
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
    },
    modal: {
        width: '90%',
        borderRadius: 12,
        padding: 20,
        maxHeight: '80%',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    textLine: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#194852',
    },
    roomDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
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
    hammersContainer: {
        marginBottom: 15,
    },
    scrollableSection: {
        flexGrow: 1,
    },
    scrollableContent: {
        alignItems: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: '#194852',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    commentContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
