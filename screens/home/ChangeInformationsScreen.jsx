import React, { useState } from 'react'
import { StyleSheet, Modal, Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import FilledButton from '../../components/buttons/FilledButton';
import { MyLightTheme } from '../../components/Theme';
import CustomInput from '../../components/inputs/CustomInput';
import UserPicture from '../../components/images/UserPicture';
import ScreenTitle from '../../components/text/ScreenTitle';
import LogoTransparent from '../../components/logos/LogoTransparent';
import IconButton from '../../components/buttons/IconButton';
import SimpleModal from '../../components/modal/SimpleModal';


function ChangeInformationsScreen({ navigation }) {
    const styles = createStyles(MyLightTheme)
    const [isShowModal, setIsShowModal] = useState(false);
    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    };

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
                <View style={styles.userContainer}>
                    <UserPicture />
                </View>
                <CustomInput placeholder='Prénom'/>
                <CustomInput placeholder='Mot de passe actuel' secureTextEntry={true}/>
                <CustomInput placeholder='Nouveau mot de passe' secureTextEntry={true}/>
                </View>
                <View style={{ width: '100%', alignItems: 'center'}}>
                    <View style={{marginBottom: 16, width: '100%', alignItems: 'center'}}>
                    <FilledButton 
                        text='Enregistrer' 
                        background={MyLightTheme.colors.deepGreen} 
                        full={true}
                        onPress={() => console.log('enregistrer')}
                    />
                    </View>
                    <FilledButton 
                        text='Supprimer mon compte' 
                        background={MyLightTheme.colors.orange} 
                        full={true} 
                        onPress={() => setIsShowModal(true)}
                    />
                </View>
            </View>
            <SimpleModal
                isShow={isShowModal} 
                toggleModal={toggleModal}
                title='Suppression de compte'
                button1={
                    <FilledButton text='Supprimer' 
                        background={MyLightTheme.colors.orange} 
                        full={true} 
                        onPress={() => console.log('delete account')}
                    />
                }
            /> 
        </SafeAreaView>
    )
}

export default ChangeInformationsScreen;

createStyles = (MyLightTheme) => StyleSheet.create({
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