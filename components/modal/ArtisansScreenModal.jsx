import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, Keyboard, TouchableWithoutFeedback, SafeAreaView, ScrollView, View, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FillableIcons from '../buttons/FillableIcons';
import FilledButton from '../buttons/FilledButton';
import CustomInput from '../inputs/CustomInput';
import CommentModal from '../../components/modal/CommentModal';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
const ipString = process.env.IP_ADDRESS;

function ArtisansScreenModal({ isShow, toggleModal, setter, projectId }) {
    const { colors } = useTheme();
    const styles = createStyles(colors, devis)

    const [devis, setDevis] = useState(0);
    const [comment, setComment] = useState('');
    const [chooseJob, setChooseJob] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [artisanEmail, setArtisanEmail] = useState('');
    const [artisanPhone, setArtisanPhone] = useState('');
    const [trustLevel, setTrustLevel] = useState(0);
    const [date, setDate] = useState(new Date());
    // const [currentComment, setCurrentComment] = useState(comment);
    console.log('DAAATE', date)
    const updateTrustLevel = (stars) => {
        setTrustLevel(stars)
    }

    const handleClose = () => {
        console.log('click')
        toggleModal(setter, isShow);
    };
    

    const [isCommentModalVisible, setCommentModalVisible] = useState(false);
    const toggleCommentModal = () => {
        setCommentModalVisible(!isCommentModalVisible);
    };

    const onDateChange = (value, selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate)
        }
    }

    const addArtisanToProject = async () => {
        const responseFromArtisanRoute = await fetch(`${ipString}/artisans/newArtisan`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: artisanEmail,
                phone: artisanPhone,
                field: chooseJob,
                company: companyName,
            })
        });
        const artisan = await responseFromArtisanRoute.json()
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
            if (responseFromProjectsRoute === 401){
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Projet introuvable'
                });
            }else if (responseFromProjectsRoute === 500) {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Erreur pendant l\'envoie'
                });
            }else {
                Toast.show({
                    type: 'success',
                    text1: 'succès',
                    text2: 'Artisan ajouté'
                });
            }
        }
    }


    
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isShow}
        >
            
                <Pressable style={styles.modalContainer} onPress={() => handleClose()}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modal}>
                            <Text style={styles.textTitle}>Nouvel Artisan :</Text>
                            <Picker
                                selectedValue={chooseJob}
                                onValueChange={(itemValue, itemIndex) => setChooseJob(itemValue)}
                            >
                                <Picker.Item label="Chauffage" value="Chauffage" />
                                <Picker.Item label="Maçonnerie" value="Maçonnerie" />
                                <Picker.Item label="Toiture" value="Toiture" />
                                <Picker.Item label="Electricité" value="Electricité" />
                                <Picker.Item label="Etanchéité" value="Etanchéité" />
                                <Picker.Item label="Cloisonnement/Plâtrage" value="CloisonnementPlâtrage" />
                                <Picker.Item label="Plomberie" value="Plomberie" />
                                <Picker.Item label="Ventilation" value="Ventilation" />

                            </Picker>
                            <CustomInput placeholder="Entreprise" vaue={companyName} onChangeText={value => setCompanyName(value)}/>
                            <CustomInput placeholder="Email" vaue={artisanEmail} onChangeText={value => setArtisanEmail(value)}/>
                            <CustomInput
                                placeholder="Téléphone" 
                                value={artisanPhone} 
                                keyboardType="numeric" 
                                onChangeText={value => setArtisanPhone(value)}
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
                                <View style={styles.inputDevis}>
                                    <TextInput
                                        style={{width: 96}}
                                        value={devis}
                                        onChangeText={(value) => setDevis(value)}
                                        keyboardType="numeric"
                                    />
                                    <FontAwesome name='euro' size={24} color={colors.deepGrey}/>
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
                                    <FilledButton text='Enregistrer' full={true} background={colors.deepGreen} onPress={() => {addArtisanToProject(), handleClose()}}/>
                                </View>
                            </View>
                        </View>
                        </TouchableWithoutFeedback >
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
    )
}

export default ArtisansScreenModal

const createStyles = (colors, devis) => StyleSheet.create({
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
        paddingBottom: 10
    },
    starsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 120, 
        justifyContent: 'space-around',
        marginLeft: 15,
    },
    commonContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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
        color: colors.deepGrey
    },
    inputDevis: {
        borderColor: devis ? colors.lightGreen : colors.lightGrey,
        borderWidth: 1,
        width: 120,
        marginLeft: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    dateContainer: {
        width: 135,
        display: 'flex',
        alignItems: 'flex-end'
    },
    buttonContainer: {
        marginLeft: 10,
        width: '100%',
        alignSelf: 'center'
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
})