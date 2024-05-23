import React, { useState } from 'react'
import { StyleSheet, Modal, Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
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

const ipString = process.env.IP_ADDRESS;

function ChangeInformationsScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    

    const [avatar, setAvatar] = useState('');
    const [prenom, setPrenom] = useState('');
    const [actualPassword, setActualPassword] = useState('');
    const [newPassword, setNewPassword] = useState('')
    console.log('prenom', prenom)

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
        const response = fetch(`${ipString}/users/editUser/${token}`)
    }

    return (
        <SafeAreaView style={{flex: 1}}>
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
                <TouchableOpacity style={styles.userContainer} onPress={() => {toggleModal(setIsShowModalImage, isShowModalImage), console.log(isShowModalImage)}}>
                    {avatar ? 
                        <Image source={avatar} style={styles.avatar} /> 
                            : 
                        <UserPicture />
                    }
                </TouchableOpacity>
                <CustomInput 
                    placeholder='Prénom' 
                    value={prenom} 
                    onChangeText={(value) => setPrenom(value)}
                />
                <CustomInput 
                    placeholder='Mot de passe actuel' 
                    secureTextEntry={true} 
                    value={actualPassword} 
                    onChangeText={(value) => setActualPassword(value)}
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
                        onPress={() => console.log('enregistrer')}
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