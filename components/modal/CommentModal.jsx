import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, TextInput, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';

const CommentModal = ({ isShow, toggleModal, comment, onSave }) => {
    const { colors } = useTheme();
    const [currentComment, setCurrentComment] = useState(comment);
    //Etat pour gérer l'ouverture du clavier en meme temps que la modale
    const textInputRef = useRef(null);

    useEffect(() => {
        if (isShow) {
            setCurrentComment(comment);
            setTimeout(() => {
                if (textInputRef.current) {
                    textInputRef.current.focus();
                }
            }, 100); //Délai pour être sur que la modale à le temps de s'ouvrir
        }
    }, [isShow]);

    const handleClose = () => {
        onSave(currentComment);
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
                                <Text style={styles.modalTitle}>Détails du projet</Text>
                                <TouchableOpacity onPress={handleClose}>
                                    <Entypo name='cross' size={40} color={'#6F797B'} />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                ref={textInputRef}
                                style={styles.textInput}
                                placeholder="Entrez votre commentaire"
                                placeholderTextColor="#6F797B"
                                multiline
                                numberOfLines={4}
                                value={currentComment}
                                onChangeText={setCurrentComment}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

CommentModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    comment: PropTypes.string,
    onSave: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
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
    textInput: {
        width: '100%',
        height: 300,
        borderColor: '#D5CDD2',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        textAlignVertical: 'top',
        marginBottom: 20,
        color: '#000000',
    },
});

export default CommentModal;
