import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView as SafeAreaViewIOS, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import FilledButton from '../../components/buttons/FilledButton';
import { useTheme } from '@react-navigation/native';
import { MyLightTheme } from '../../components/Theme';
import CustomInput from '../../components/inputs/CustomInput';
import UserPicture from '../../components/images/UserPicture';
import ScreenTitle from '../../components/text/ScreenTitle';
import LogoTransparent from '../../components/logos/LogoTransparent';
import IconButton from '../../components/buttons/IconButton';
import SimpleModal from '../../components/modal/SimpleModal';
import ImageSelectorModal from '../../components/modal/ImageSelectorModal'
import { useSelector } from 'react-redux'; 
import Toast from 'react-native-toast-message';
const ipString = process.env.IP_ADDRESS;
const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

function ChangeInformationsScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const userInfos = useSelector((state) => state.user.userInfos);
    const token = userInfos.token
    const currentName = userInfos.name

    const [avatar, setAvatar] = useState('');
    const [name, setname] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('')
    

    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalImage, setIsShowModalImage] = useState(false);

    const toggleModal = (setter, isShowModalBoolean) => {
        setter(!isShowModalBoolean);
    };

    const handleImageSelect = (image) => {
        console.log('Image sélectionnée :', image);
        setAvatar(image);
    };

    const changeInformations = async () => {
        
        const response = await fetch(`${ipString}/users/editUser/${token}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({                 
                name: name ? name : currentName,
                avatar: avatar.name,
                currentPassword: currentPassword,
                newPassword: newPassword
            })
        });
        console.log('name', name)
        if(response.status === 500) {
            Toast.show({
                type: 'error',
                text1: 'erreur',
                text2: 'erreur durant l\'update',
            })
        }else if (response.status === 401) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Mot de passe invalide',
            });
        }else {
            Toast.show({
                type: 'success',
                text1: 'succès',
                text2: 'Profil actualisé',
            })
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={20}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <IconButton
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('HomeScreen')}
                            iconName="long-arrow-left"
                        />
                        <LogoTransparent />
                    </View>
                    <View style={styles.mainContainer}>
                        <View style={{ width: '100%', alignItems: 'center'}}>
                            <ScreenTitle text='Modifier mes informations'/>
                            <TouchableOpacity style={styles.userContainer} onPress={() => {toggleModal(setIsShowModalImage, isShowModalImage)}}>
                                {avatar ? 
                                    <Image source={avatar} style={styles.avatar} /> 
                                        : 
                                    <UserPicture />
                                }
                            </TouchableOpacity>
                            <CustomInput 
                                placeholder='Prénom' 
                                value={name} 
                                onChangeText={(value) => setname(value)}
                            />
                            <CustomInput 
                                placeholder='Mot de passe actuel' 
                                secureTextEntry={true} 
                                value={currentPassword} 
                                onChangeText={(value) => setCurrentPassword(value)}
                            />
                            <CustomInput 
                                placeholder='Nouveau mot de passe' 
                                secureTextEntry={true} 
                                value={newPassword} 
                                onChangeText={(value) => setNewPassword(value)}
                            />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center'}}>
                            <View style={{marginBottom: 16, width: '100%', alignItems: 'center'}}>
                            <FilledButton 
                                text='Enregistrer' 
                                background={colors.deepGreen} 
                                full={true}
                                onPress={() => { changeInformations(), navigation.navigate('HomeScreen') }}
                            />
                            </View>
                            <FilledButton 
                                text='Supprimer mon compte' 
                                background={colors.orange} 
                                full={true} 
                                onPress={() => setIsShowModal(true)}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <SimpleModal
                isShow={isShowModal} 
                toggleModal={() => toggleModal(setIsShowModal, isShowModal)}
                title='Suppression de compte'
                button1={
                    <FilledButton text='Supprimer' 
                        background={MyLightTheme.colors.orange} 
                        full={true} 
                        onPress={() => {console.log('delete account'), toggleModal(setIsShowModal, isShowModal)}}
                    />
                }
            /> 
            <ImageSelectorModal 
                isShow={isShowModalImage} 
                toggleModal={() => toggleModal(setIsShowModalImage, isShowModalImage)}
                onSelectImage={handleImageSelect} 
            />
        </SafeAreaView>
    )
}

export default ChangeInformationsScreen;

createStyles = (colors) => StyleSheet.create({
    
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        position: 'relative',
    },
    iconButton: {
        position: 'absolute',
        left: 20,
        top: '50%',
        marginTop: -25,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 22,
    },
    container: {
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    userContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    profilePicture: {
        height: 50,
        width: 50,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
    },
    helloText: {
        paddingLeft: 10,
        fontSize: 24,
        lineHeight: 23,
        letterSpacing: 0.15,
        color: '#194852',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 34,
        letterSpacing: 0.15,
        color: '#194852',
    },
    nouveauBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#299D8E',
        borderRadius: 8,
        height: 25,
        width: 64,
    }, 
    projects : {
        width: '100%',
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 
    titleDashboard: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 36,
        letterSpacing: 0.15,
        color: '#194852',
        paddingHorizontal: 22
    },
    dashboard: {
        width: '100%',
        height: '60%',  
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'rgba(41, 157, 142, 0.2)',
    },

})