import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Image, Text } from 'react-native';
import IconButton from '../../components/buttons/IconButton';
import PlainButton from '../../components/buttons/PlainButton';
import FilledButton from '../../components/buttons/FilledButton'
import { useTheme } from '@react-navigation/native';
import SpiderChart from '../../components/homeProject/SpiderChart';
import SimpleModal from '../../components/modal/SimpleModal';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '@env';

function SkillsScreen({ navigation }) {
    const { colors } = useTheme()
    const styles = createStyles(colors)

    const [isShowModal, setIsShowModal] = useState(false);
    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    };

    const logOut = async() => {
            await AsyncStorage.clear();
            const token = await AsyncStorage.getItem('userToken')
            console.log('token', token)
            if (!token) {
                console.log('token has been deleted')
                const response = await fetch(`${IP_ADDRESS}/users/logout`) 

                const data = await response.json();
                console.log('data', data);
                if (response.status === 200) {
                    console.log('data.status', response.status)
                    Toast.show({
                        type: 'success',
                        text1: 'Succès',
                        text2: 'Déconnection avec succès'
                    });
                    navigation.navigate('ConnectionStack',  { screen: 'ConnectionScreen' });
                }else {
                    console.log('error')
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: 'erreur dans la déconnection'
                    });
                }
            }else {
                console.log('test_3')
                Toast.show({
                    type: 'error',
                        text1: 'Erreur',
                        text2: 'failed dans la déconnection'
                });
            }
    }

    return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
            <IconButton
                style={styles.iconButton}
                onPress={() => navigation.navigate('HomeScreen')}
                iconName="long-arrow-left"
            />
            <Image source={require('../../assets/Leyla.png')} style={styles.profilePicture} /> 
            <Text>Leyla</Text>
            <IconButton 
                onPress={() => toggleModal()}
                iconName='ellipsis-h'
            /> 
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Mes compétences</Text>
            <PlainButton text='Modifier' onPress={() => navigation.navigate('ChangeSkillsScreen')}/> 
        </View>
        <SpiderChart />
        <SimpleModal 
            isShow={isShowModal}
            toggleModal={toggleModal}
            button1={
                <View style={{width: '90%'}}>
                    <PlainButton 
                        text='Modifier mes informations'
                        onPress={() => {navigation.navigate('ChangeInformationsScreen'), toggleModal()}}
                    />
                </View>
            }
            button2={
                <FilledButton 
                    full={true}
                    text='Se Déconnecter'
                    background={colors.deepGreen}
                    onPress={() => logOut()}
                />
            }
        />
    </SafeAreaView>
    )
}

export default SkillsScreen;

const createStyles = (colors) => StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 20,
    },
    iconButton: {
        alignSelf: 'flex-start'
    },
    titleContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    profilePicture: {
        height: 50,
        width: 50,
    },
    title: {
        fontWeight: 800,
        fontSize: 18,
        fontStyle: 'normal',
        lineHeight: 36,
        letterSpacing: 0.15,
        color: colors.deepGreen,
    },
})


