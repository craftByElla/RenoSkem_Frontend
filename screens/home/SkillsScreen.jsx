import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, View, SafeAreaView as SafeAreaViewIOS, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR} from 'react-native-safe-area-context';
import IconButton from '../../components/buttons/IconButton';
import PlainButton from '../../components/buttons/PlainButton';
import FilledButton from '../../components/buttons/FilledButton'
import { useTheme, useRoute } from '@react-navigation/native';
import SpiderChart from '../../components/charts/SpiderChart';
import SimpleModal from '../../components/modal/SimpleModal';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
const ipString = process.env.IP_ADDRESS;
const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

function SkillsScreen({ navigation }) {
    const { colors } = useTheme();
    const userInfos = useSelector((state) => state.user.userInfos);
    const styles = createStyles(colors);
    const route = useRoute();
    const { skillsFromBack } = route.params;
    // console.log('Compétences reçues :', skillsFromBack);

    const [isShowModal, setIsShowModal] = useState(false);
    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    };

    const [skilledToSendOnPress, setSkilledToSendOnPress] = useState({})

    const filterSkills = (works, skills) => {
        const newSkills = {}
        for (let work = 0; work < works.length; work++){
            for (const skill in skills){
                if (works[work] === skill) { 
                    newSkills[skill] = skills[skill] 
                }
            }
        }
        setSkilledToSendOnPress(newSkills)
        return newSkills
    }
//---------------------------FONCTION FETCH POUR VIDER LE LOCAL STORAGE, DECONNECTION--------------------------------

    const logOut = async() => {
        await AsyncStorage.clear();
        const token = await AsyncStorage.getItem('userToken')
        // console.log('token', token)
        if (!token) {
            // console.log('token has been deleted')
            const response = await fetch(`${ipString}/users/logout`) 
            // console.log('response', response.status)
            // console.log('data', data);
            if (response.status === 200) {
                // console.log('data.status', response.status)
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Déconnection avec succès'
                });
                navigation.navigate('ConnectionStack',  { screen: 'ConnectionScreen' });
            }else {
                // console.log('error')
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'erreur dans la déconnection'
                });
            }
        }else {
            // console.log('test_3')
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
            <Image source={{ uri: userInfos.avatar }} style={styles.profilePicture} /> 
            <Text>{userInfos.name}</Text>
            <IconButton 
                onPress={() => toggleModal()}
                iconName='ellipsis-h'
            /> 
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Mes compétences</Text>
            <PlainButton text='Modifier' onPress={() => navigation.navigate('ChangeSkillsScreen', { skillsFromBack })}/> 
        </View>
        <SpiderChart 
            skills={ skilledToSendOnPress ? skilledToSendOnPress : skillsFromBack }
        />
        <TouchableOpacity onPress={() => {filterSkills(['Maçonnerie', 'Fondations', 'Toiture', 'Démolition'], skillsFromBack)}}><Text>Stucture et gros oeuvres</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {filterSkills(['Étanchéité', 'Isolation', 'Façade', 'Cloisonnement/Plâtrage'], skillsFromBack)}}><Text>Isolation et étanchéité</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {filterSkills(['Maçonnerie', 'Démolition', 'Étanchéité', 'Isolation', 'Façade', 'Cloisonnement/Plâtrage'], skillsFromBack)}}><Text>Isolation et étanchéité</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {filterSkills(['Étanchéité', 'Isolation', 'Façade', 'Cloisonnement/Plâtrage'], skillsFromBack)}}><Text>Isolation et étanchéité</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {filterSkills(['Étanchéité', 'Isolation', 'Façade', 'Cloisonnement/Plâtrage'], skillsFromBack)}}><Text>Isolation et étanchéité</Text></TouchableOpacity>

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
        fontWeight: '800',
        fontSize: 18,
        fontStyle: 'normal',
        lineHeight: 36,
        letterSpacing: 0.15,
        color: colors.deepGreen,
    },
})



