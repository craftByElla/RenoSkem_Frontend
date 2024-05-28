import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import Hammers from '../../components/buttons/Hammers';
import FilledButton from '../../components/buttons/FilledButton';
import CommentModal from '../../components/modal/CommentModal';
import PosteItem from '../../components/buttons/PosteItem';
import Toast from 'react-native-toast-message';

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

const RoomDetailsModal = ({ isShow, toggleModal, onSave, roomId, roomDetails, onRoomDeleted }) => {
    const { colors } = useTheme();
    const [name, setName] = useState('');
    const [surface, setSurface] = useState('');
    const [selectedPostes, setSelectedPostes] = useState([]);
    const [fields, setFields] = useState({});
    const [comment, setComment] = useState('');
    const [isCommentModalVisible, setCommentModalVisible] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        if (roomDetails) {
            setName(roomDetails.name || '');
            setSurface(roomDetails.surface !== null ? String(roomDetails.surface) : '');
            setComment(roomDetails.comment || '');
            setSelectedPostes(roomDetails.items ? roomDetails.items.map(item => item.field) : []);
            setFields(roomDetails.items ? roomDetails.items.reduce((acc, item) => {
                acc[item.field] = item.difficulty;
                return acc;
            }, {}) : {});
        } else {
            setName('');
            setSurface('');
            setComment('');
            setSelectedPostes([]);
            setFields({});
        }
    }, [roomDetails]);

    const handleSave = () => {
        const items = selectedPostes.map(poste => ({
            field: poste,
            difficulty: fields[poste],
        }));
        onSave(name, surface, items, comment, roomId);
        toggleModal();
    };
    
    const handleAddPoste = (poste) => {
        if (poste && !selectedPostes.includes(poste)) {
            setSelectedPostes([...selectedPostes, poste]);
            setFields(prevFields => ({
                ...prevFields,
                [poste]: 1
            }));
            setDropdownVisible(false);
        }
    };

    const handleRemovePoste = (poste) => {
        setSelectedPostes(selectedPostes.filter(item => item !== poste));
        setFields(prevFields => {
            const newFields = { ...prevFields };
            delete newFields[poste];
            return newFields;
        });
    };

    const handlePress = (index, value) => {
        const poste = selectedPostes[index];
        setFields(prevFields => ({
            ...prevFields,
            [poste]: value
        }));
    };

    const toggleCommentModal = () => {
        setCommentModalVisible(!isCommentModalVisible);
    };

    const handleDeleteRoom = async () => {
        try {
            const response = await fetch(`${process.env.IP_ADDRESS}/rooms/deleteRoom/${roomId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
    
            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'La pièce a été supprimée avec succès'
                });
                onRoomDeleted(roomId);
                toggleModal();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message || 'Une erreur est survenue lors de la suppression de la pièce'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la suppression de la pièce'
            });
        }
    };
    

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isShow}
            onRequestClose={toggleModal}
        >
            <TouchableWithoutFeedback onPress={toggleModal}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalContainer, { backgroundColor: colors.modalBackgroundColor }]}>
                            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                                <View style={styles.header}>
                                    <Text style={styles.modalTitle}>Détails de la pièce</Text>
                                    <TouchableOpacity onPress={() => { handleSave(); toggleModal(); }}>
                                        <Entypo name='cross' size={40} color={colors.deepGrey} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputRow}>
                                    <TouchableOpacity style={styles.iconWrapper} onPress={handleDeleteRoom}>
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
                                <View style={styles.inputRow}>
                                    <Text style={styles.label}>Surface de la pièce ►</Text>
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
                                <View>
                                    <Text style={styles.label}>Définissez les rénovations ▼</Text>
                                </View>
                                {selectedPostes.length > 0 && (
                                    <View style={styles.hammersContainer}>
                                        <Hammers style={styles.hammers} />
                                    </View>
                                )}
                                <ScrollView style={styles.scrollableSection} contentContainerStyle={styles.scrollableContent}>
                                    {selectedPostes.map((poste, index) => (
                                        <PosteItem
                                            key={index}
                                            text={poste}
                                            selectedButton={fields[poste]}
                                            handlePress={handlePress}
                                            index={index}
                                            onRemove={() => handleRemovePoste(poste)}
                                        />
                                    ))}
                                </ScrollView>
                                <TouchableOpacity style={styles.addButton} onPress={() => setDropdownVisible(!isDropdownVisible)}>
                                    <Text style={styles.addButtonText}>Ajouter un poste de travail</Text>
                                </TouchableOpacity>
                                {isDropdownVisible && (
                                    <View style={styles.dropdown}>
                                        <ScrollView>
                                            {postesTravaux.filter(poste => !selectedPostes.includes(poste)).map((poste, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.dropdownItem}
                                                    onPress={() => handleAddPoste(poste)}
                                                >
                                                    <Text>{poste}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                )}
                                <View style={styles.commentSection}>
                                    <Text style={styles.commentLabel}>Commentaire ▼</Text>
                                    {comment ? (
                                        <View style={styles.commentBox}>
                                            <Text style={styles.commentText}>{comment}</Text>
                                        </View>
                                    ) : null}
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
            <CommentModal
                isShow={isCommentModalVisible}
                toggleModal={toggleCommentModal}
                comment={comment}
                onSave={(newComment) => {
                    setComment(newComment);
                }}
            />
        </Modal>
    );
};

RoomDetailsModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    roomId: PropTypes.string.isRequired,
    roomDetails: PropTypes.object,
    onRoomDeleted: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 12,
        padding: 20,
        maxHeight: '80%',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    header: {
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
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconWrapper: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
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
    label: {
        color: '#6F797B',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0.15,
        marginRight: 10,
    },
    hammersContainer: {
        alignItems: 'flex-end',
        marginRight: -35,
    },
    scrollableSection: {
        flexGrow: 1,
    },
    scrollableContent: {
        paddingBottom: 15,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        width: '100%',
        marginBottom: 15,
    },
    dropdownItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    addButton: {
        backgroundColor: '#194852',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 21,
        letterSpacing: 0.25,
    },
    posteWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 8,
    },
    commentSection: {
        marginTop: 10,
        
    },
    commentLabel: {
        color: '#6F797B',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0.15,
        marginBottom: 5,
    },
    commentBox: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },
    commentText: {
        fontSize: 16,
        color: '#333',
    },
    commentButton: {
        width: '100%',
        borderRadius: 8,
        marginLeft: 0,
    },
    radioButtons: {
        flexGrow: 1,
    },
});

export default RoomDetailsModal;
