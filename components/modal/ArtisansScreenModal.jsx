import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, Keyboard, TouchableWithoutFeedback, SafeAreaView, ScrollView, View, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FillableIcons from '../buttons/FillableIcons';
import FilledButton from '../buttons/FilledButton';
import CommentModal from '../../components/modal/CommentModal';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
const ipString = process.env.IP_ADDRESS;

function ArtisansScreenModal({ isShow, toggleModal, setter, projectId, onClose }) {
    const { colors } = useTheme();
    const styles = createStyles(colors, devis);

    const token = useSelector((state) => state.user.userInfos.token)
    const [devis, setDevis] = useState(0);
    const [comment, setComment] = useState('');
    const [chooseJob, setChooseJob] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [artisanEmail, setArtisanEmail] = useState('');
    const [artisanPhone, setArtisanPhone] = useState('');
    const [trustLevel, setTrustLevel] = useState(0);
    const [date, setDate] = useState(new Date());

    const updateTrustLevel = (stars) => {
        setTrustLevel(stars);
    };

    const handleClose = () => {
        toggleModal(setter, isShow);
        onClose(); // Assurez-vous que le callback onClose est appelé lors de la fermeture
    };

    const [isCommentModalVisible, setCommentModalVisible] = useState(false);
    const toggleCommentModal = () => {
        setCommentModalVisible(!isCommentModalVisible);
    };

    const onDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const addArtisanToProject = async () => {
        const responseFromArtisanRoute = await fetch(`${ipString}/artisans/newArtisan/${token}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: artisanEmail,
                phone: artisanPhone,
                field: chooseJob,
                company: companyName,
            })
        });
        const artisan = await responseFromArtisanRoute.json();
        if (responseFromArtisanRoute.status === 500) {
            return;
        } else {
            const responseFromProjectsRoute = await fetch(`${ipString}/projects/addArtisanToProject/`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    artisanId: artisan.artisan._id,
                    availability: date,
                    trustLevel: trustLevel,
                    quote: devis,
                    comment: comment,
                    projectId: projectId,
                }),
            });
            if (responseFromProjectsRoute.status === 401) {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Projet introuvable'
                });
            } else if (responseFromProjectsRoute.status === 500) {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Erreur pendant l\'envoi'
                });
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Artisan ajouté'
                });
                handleClose(); // Appel de handleClose pour fermer la modale et relancer le fetch
            }
        }
    
        setDevis(0);
        setComment('');
        setChooseJob('');
        setCompanyName('');
        setArtisanEmail('');
        setArtisanPhone('');
        setTrustLevel(0);
        setDate(new Date());
    };

    const patternEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const patternPhone = /^\d{10}/
    
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isShow}
            onRequestClose={handleClose} // Utilisez onRequestClose pour gérer la fermeture
        >
            
                <View style={styles.modalContainer} onPress={() => handleClose()}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.modal}>
                        <ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={styles.textTitle}>Nouvel Artisan :</Text>
                                <Entypo name="cross" size={40} color={"#6F797B"} onPress={() => handleClose()}/>
                            </View>
                            <Picker
                                style={{backgroundColor: colors.deepGreen, borderRadius: 10, marginBottom: 10}}
                                itemStyle={{color: colors.modalBackgroundColor}}
                                selectedValue={chooseJob}
                                onValueChange={(itemValue, itemIndex) => setChooseJob(itemValue)}
                            >
                                <Picker.Item label="Chauffage" value="Chauffage" />
                                <Picker.Item label="Cloisonnement/Plâtrage" value="Cloisonnement/Plâtrage" />
                                <Picker.Item label="Démolition" value="Démolition" />
                                <Picker.Item label="Electricité" value="Électricité" />
                                <Picker.Item label="Etanchéité" value="Étanchéité" />
                                <Picker.Item label="Façade" value="Façade" />
                                <Picker.Item label="Fondations" value="Fondations" />
                                <Picker.Item label="Instalalation cuisine/SDB" value="Installation cuisine/SDB" />
                                <Picker.Item label="Isolation" value="Isolation" />
                                <Picker.Item label="Maçonnerie" value="Maçonnerie" />
                                <Picker.Item label="Menuiserie" value="Menuiserie" />
                                <Picker.Item label="Montage de meuble" value="Montage de meuble" />
                                <Picker.Item label="Peinture" value="Peinture" />
                                <Picker.Item label="Plomberie" value="Plomberie" />
                                <Picker.Item label="Revêtements muraux" value="Revêtements muraux" />
                                <Picker.Item label="Revêtements sol" value="Revêtements sol" />
                                <Picker.Item label="Revêtements extérieurs" value="Revêtement extérieurs" />
                                <Picker.Item label="Toiture" value="Toiture" />
                                <Picker.Item label="Ventilation" value="Ventilation" />
                            </Picker>
                            <TextInput
                                        style={[
                                            styles.input,
                                            {
                                                borderColor: companyName ? colors.lightGreen : colors.grey,
                                            }
                                        ]}
                                        placeholder="Entreprise"
                                        placeholderTextColor={colors.grey}
                                        value={companyName}
                                        onChangeText={setCompanyName}
                                    />
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor: artisanEmail ? patternEmail.test(artisanEmail) ? colors.lightGreen : colors.orange : colors.grey, 
                                    }
                                ]}
                                placeholder="Email"
                                placeholderTextColor={colors.grey}
                                value={artisanEmail}
                                onChangeText={setArtisanEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor: artisanPhone ? patternPhone.test(artisanPhone) ? colors.lightGreen : colors.orange : colors.grey,
                                    }
                                ]}
                                placeholder="Téléphone"
                                placeholderTextColor={colors.grey}
                                value={artisanPhone}
                                onChangeText={setArtisanPhone}
                                keyboardType="numeric"
                            />
                            <View style={styles.indiceContainer}>
                                <Text style={styles.text}>Indice de confiance</Text>
                                <FontAwesome name='caret-right' size={24} color={colors.deepGrey}/>
                                <View style={styles.starsContainer}>
                                    <FillableIcons plainIcon='star-o' filledIcon='star' color='orange' updateTrustLevel={updateTrustLevel} />
                                </View>
                            </View>
                            <View style={styles.indiceContainer}>
                                <Text style={styles.text}>Devis</Text>
                                <FontAwesome name='caret-right' size={24} color={colors.deepGrey}/>
                                <View style={[
                                    styles.inputDevis, 
                                    {
                                        borderColor: devis ? colors.lightGreen : colors.grey,
                                    }
                                ]}>
                                    <TextInput
                                        style={{width: 96}}
                                        value={devis}
                                        onChangeText={(value) => setDevis(value)}
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
                                        value={date}
                                        locale='fr-FR'
                                        onChange={onDateChange}
                                    />
                                </View>
                            </View>
                            <View style={styles.maxiContainer}>
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
                                    <FilledButton text='Enregistrer' full={true} background={colors.deepGreen} onPress={() => {addArtisanToProject(), handleClose()}}/>
                                </View>
                            </View>
                        </ScrollView>
                        </SafeAreaView>
                        </TouchableWithoutFeedback >
                </View>
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

export default ArtisansScreenModal;

const createStyles = (colors, devis) => StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        height: '80%',
        width: '90%',
        borderRadius: 12,
        backgroundColor: colors.modalBackgroundColor,
        paddingHorizontal: 20,
    },
    input: {
        width: '80%',
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
        alignSelf: 'center',
        marginBottom: 10,
    },
    indiceContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10

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
    inputDevis: {
        borderColor: devis ? colors.lightGreen : colors.lightGrey,
        borderWidth: 1,
        height: 25,
        width: 120,
        marginLeft: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    dateContainer: {
        width: 135,
        display: 'flex',
        alignItems: 'flex-end',
    },
    buttonContainer: {
        marginLeft: 10,
        width: '100%',
        alignSelf: 'center',
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
        padding: 10,
        width: '90%',
        allignSelf: 'center',
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
    maxiContainer : {
        marginBottom: 20
    },
});
