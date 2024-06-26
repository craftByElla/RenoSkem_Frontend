import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, View, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FillableIcons from '../buttons/FillableIcons';
import FilledButton from '../buttons/FilledButton';
import CommentModal from '../../components/modal/CommentModal';
import Toast from 'react-native-toast-message';
import { useTheme } from '@react-navigation/native';
const ipString = process.env.IP_ADDRESS;

function UpdateArtisansScreenModal(props) {
    const { colors } = useTheme();
    const styles = createStyles(colors, quote);

    const [quote, setQuote] = useState('');
    const [comment, setComment] = useState('');
    const [trustLevel, setTrustLevel] = useState('');
    const [availability, setAvailability] = useState(new Date());
    const [artisanId, setArtisanID] = useState('');

    useEffect(() => {
        if (props.retrievedProjectCardInfos) {
            setComment(props.retrievedProjectCardInfos.comment || '');
            setQuote(props.retrievedProjectCardInfos.quote || '1');
            const availableDate = new Date(props.retrievedProjectCardInfos.availability);
            if (!isNaN(availableDate)) {
                setAvailability(availableDate);
            }
            setTrustLevel(props.retrievedProjectCardInfos.trustLevel || '');
            setArtisanID(props.retrievedProjectCardInfos.artisanId || '');
        }
    }, [props.retrievedProjectCardInfos]);

    const updateTrustLevel = (stars) => {
        setTrustLevel(stars);
    };

    const handleClose = () => {
        props.toggleModal(props.setter, props.isShow);
        props.onClose(); // Assurez-vous que le callback onClose est appelé lors de la fermeture
    };

    const [isCommentModalVisible, setCommentModalVisible] = useState(false);
    const toggleCommentModal = () => {
        setCommentModalVisible(!isCommentModalVisible);
    };

    const onDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setAvailability(selectedDate);
        }
    };

    const updateArtisanProject = async () => {
        const response = await fetch(`${ipString}/projects/editProjectArtisan/${props.projectId}/${artisanId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                availability: availability,
                trustLevel: trustLevel,
                comment: comment,
                quote: quote,
            })
        });
        const artisan = await response.json();
        if (response.status === 500) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Erreur pendant l\'envoi'
            });
        } else if (response.status === 401) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Artisan introuvable'
            });
        } else {
            Toast.show({
                type: 'success',
                text1: 'Succès',
                text2: 'Artisan modifié'
            });
            handleClose(); // Appel de handleClose pour fermer la modale et relancer le fetch
        }
    };

    const removeArtisanFromProject = async () => {
        const response = await fetch(`${ipString}/projects/removeArtisanFromProject/${props.projectId}/${artisanId}`, {
            method: 'PUT',
        });
        const artisan = await response.json();
        if (response.status === 500) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Erreur pendant l\'envoi'
            });
        } else if (response.status === 401) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Artisan introuvable'
            });
        } else {
            Toast.show({
                type: 'success',
                text1: 'Succès',
                text2: 'Artisan supprimé'
            });
            handleClose(); // Appel de handleClose pour fermer la modale et relancer le fetch
        }
    };

    return (
    <Modal
            transparent={true}
            animationType="slide"
            visible={props.isShow}
            onRequestClose={handleClose} // Utilisez onRequestClose pour gérer la fermeture
        >
            <Pressable style={styles.modalContainer} onPress={handleClose}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modal}>
                            <Text style={styles.textTitle}>Nouvel Artisan :</Text>
                            <View style={styles.indiceContainer}>
                                <Text style={styles.text}>Indice de confiance</Text>
                                <FontAwesome name='caret-right' size={24} color={colors.deepGrey}/>
                                <View style={styles.starsContainer}>
                                    <FillableIcons plainIcon='star-o' filledIcon='star' color='orange' updateTrustLevel={updateTrustLevel} trustLevel = {trustLevel}/>
                                </View>
                            </View>
                            <View style={styles.indiceContainer}>
                                <Text style={styles.text}>Devis</Text>
                                <FontAwesome name='caret-right' size={24} color={colors.deepGrey}/>
                                <View style={styles.inputquote}>
                                    <TextInput
                                        style={{width: 96}}
                                        value={quote.toString()}
                                        onChangeText={(value) => setQuote(value)}
                                        keyboardType="numeric"
                                    />
                                    <Text>€</Text>
                                </View>
                            </View>
                            <View style={styles.indiceContainer}>
                                <Text style={styles.text}>1ère disponibilité</Text>
                                <FontAwesome name='caret-right' size={24} color={colors.deepGrey}/>
                                <View style={styles.dateContainer}>
                                    <DateTimePicker 
                                        value={typeof availability === 'object' ? availability : new Date()}
                                        locale='fr-FR'
                                        onChange={onDateChange}
                                    />
                                </View>
                            </View>
                            <View>
                                <View style={styles.commonContainer}>
                                    <Text style={styles.text}>Commentaire</Text>
                                    <FontAwesome name='caret-down' size={24} color={colors.deepGrey}/>
                                </View>
                                <View style={styles.commentSection}>
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
                                <View style={styles.buttonContainer}>
                                    <FilledButton text='Enregistrer' full={true} background={colors.deepGreen} onPress={() => {updateArtisanProject(), handleClose()}}/>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <FilledButton text='Supprimer' full={true} background={colors.deepGreen} onPress={() => {removeArtisanFromProject(), handleClose()}}/>
                                </View>
                            </View>
                        {/* </View> */}
                    </View>
                </TouchableWithoutFeedback>
            </Pressable>
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
}

export default UpdateArtisansScreenModal;

const createStyles = (colors, quote) => StyleSheet.create({
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
        backgroundColor: colors.modalBackgroundColor,
    },
    indiceContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
        marginTop: 10,
    },
    starsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 120,
        justifyContent: 'space-around',
        marginLeft: 15,
    },
    commonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        width: '100%',
        height: 300,
        borderColor: colors.lightGreen,
        borderWidth: 2,
        borderRadius: 4,
        padding: 10,
        textAlignVertical: 'top',
        marginBottom: 20,
        color: '#000000',
    },
    textTitle: {
        color: colors.deepGrey,
        fontWeight: 'bold',
    },
    text: {
        width: '50%',
        color: colors.deepGrey,
    },
    inputquote: {
        borderColor: colors.deepGreen,
        borderWidth: 1,
        width: 120,
        height: 25,
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    dateContainer: {
        width: 135,
        display: 'flex',
        alignItems: 'flex-end',
    },
    commentLabel: {
        color: '#6F797B',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0.15,
    },
    commentSection: {
        paddingBottom: 10
    },
    commentBox: {
        padding: 10,
        backgroundColor: colors.lightGrey,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.lightGreen,
    },
    commentText: {
        fontSize: 16,
        color: '#333',
    },
    commentButton: {
        marginVertical: 10,
        width: '90%',
        borderRadius: 8,
        alignSelf: 'center',
    },
    buttonContainer: {
        marginLeft: 10,
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
    },
})