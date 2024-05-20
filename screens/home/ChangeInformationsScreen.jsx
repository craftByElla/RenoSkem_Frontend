import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import PlainButton from '../../components/buttons/PlainButton';
import FilledButton from '../../components/buttons/FilledButton';
import { MyLightTheme } from '../../components/Theme';
import CustomInput from '../../components/inputs/CustomInput';
import UserPicture from '../../components/images/UserPicture';
import ScreenTitle from '../../components/text/ScreenTitle';
import LogoTransparent from '../../components/logos/LogoTransparent';
import IconButton from '../../components/buttons/IconButton';

function ChangeInformationsScreen({ navigation }) {

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.header}>
                <IconButton
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('ConnectionScreen')}
                    iconName="arrow-left"
                />
                <View style={styles.logoWrapper}>
                    <LogoTransparent />
                </View>
            </View>
            <ScreenTitle text='Modifier mes infomations'/>
            <UserPicture />
            <CustomInput placeholder='Prénom'/>
            <CustomInput placeholder='Mot de passe actuel'/>
            <CustomInput placeholder='Nouveau mot de passe'/>
            <FilledButton text='Enregistrer' background={MyLightTheme.colors.deepGreen} full={true} />
            <FilledButton text='Supprimer mon compte' background={MyLightTheme.colors.orange} full={true} />
        </SafeAreaView>
    )
}

export default ChangeInformationsScreen;

const styles = StyleSheet.create({
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
    logoWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 22,
    },
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
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


