import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Pressable } from 'react-native';
import Project from '../../components/charts/Project';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ipString = process.env.IP_ADDRESS;
import { addUserInfosToStore } from '../../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const userInfos = useSelector((state) => state.user.userInfos)
    console.log('userInfos', userInfos)

    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        (async () => {
            try{
                const token = await AsyncStorage.getItem('userToken');
                
                const response = await fetch(`${ipString}/users/getUserByToken/${token}`)
                console.log('token', token)
                const userData = await response.json()
                console.log(userData)
                if(response.status === 401) {
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: 'Utilisateur introuvable'
                    });
                    // navigation.navigate('ConnectionStack',  { screen: 'ConnectionScreen' });
                }else if (response.status === 200) {
                    console.log('userDataName', userData.user.name)
                    const skills = userData.user.skills
                    delete skills.__v;
                    delete skills._id;
                    dispatch(addUserInfosToStore({
                        name: userData.user.name,
                        avatar: userData.user.avatar,
                        skills: skills,
                    }
                    ))
                    setName(userData.user.name)
                    setAvatar(userData.user.avatar)
                }

            }catch (error){
                console.error('There was a problem with the fetch operation:', error);
            }
        })();
    }, [])

    const projectNames = [
        'Maison2.0',
        'Chez Papy', 
        'Mezzanine',
    ]

    const projectName = projectNames.map((data, i ) => {
        return <Project key={i} name={data}/> 
    })

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.main}>
                <Pressable style={styles.userContainer} onPress={() => navigation.navigate('SkillsScreen')}>
                    <View style={styles.avatarWrapper}>
                        <Image source={{ uri: avatar }} style={styles.profilePicture} /> 
                    </View>
                    <Text style={styles.helloText}>Hey {name} !</Text>
                </Pressable>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Mes Projets</Text>
                    <TouchableOpacity style={styles.nouveauBtn} onPress={() => navigation.navigate('CreateProjectStack')}><Text>Nouveau</Text></TouchableOpacity>
                </View>
                <View style={styles.projects}>
                    {projectName}
                </View>
            </View>
            <Text style={styles.titleDashboard}>Dashboard</Text>
            <View style={styles.dashboard}>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
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
    avatarWrapper: {
        borderWidth: 1,
        borderColor: 'rgba(41, 157, 142, 1)',
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderRadius: 70, // Assurez-vous que la bordure soit toujours ronde
        overflow: 'hidden', // Assurez-vous que l'image soit coupée aux bords
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


