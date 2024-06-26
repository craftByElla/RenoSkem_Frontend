import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Platform,  ScrollView, SafeAreaView as SafeAreaViewIOS } from 'react-native';
import SmallProjectCard from '../../components/cards/SmallProjectCard';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUserInfosToStore } from '../../reducers/user';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeAreaView as SafeAreaViewANDR} from 'react-native-safe-area-context';
import KPIBox from '../../components/cards/KPIBox';
import KPIColumnChart from '../../components/charts/KPIColumnChart';


const ipString = process.env.IP_ADDRESS;
const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

function HomeScreen({ navigation }) {
    const dispatch = useDispatch();

    // console.log('userInfos', userInfos);
    const userInfos = useSelector((state) => state.user.userInfos);
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState(null);
    const [projects, setProjects] = useState([]);
    const [skillsFromBack, setSkillsFromBack] = useState([])

    const getAvatarUrl = (avatarName) => {
        if (!avatarName) {
            return null;
        }
        return `${ipString}/assets/${avatarName}`;
    };
    

    useFocusEffect(
        useCallback(() => { //permet d'optimiser les performances. A voir dans la doc pour plus de précision en vrai 
            (async () => {
                try {
                    const token = await AsyncStorage.getItem('userToken');
                    
                    const response = await fetch(`${ipString}/users/getUserByToken/${token}`);
                    // console.log('token', token);
                    const userData = await response.json();
                    // console.log(userData);
                    if(response.status === 401) {
                        Toast.show({
                            type: 'error',
                            text1: 'Erreur',
                            text2: 'Utilisateur introuvable'
                        });
                        // navigation.navigate('ConnectionStack',  { screen: 'ConnectionScreen' });
                    } else if (response.status === 200) {
                        // console.log('userDataName', userData.user.name);
                        const skills = userData.user.skills;
                        delete skills.__v;
                        delete skills._id;
                        dispatch(addUserInfosToStore({
                            name: userData.user.name,
                            avatar: getAvatarUrl(userData.user.avatar),
                            token: userData.user.token,
                        }));
                        setName(userData.user.name);
                        setAvatar(getAvatarUrl(userData.user.avatar));
                        setSkillsFromBack(skills)
                    }
                    const secondResponse = await fetch(`${ipString}/projects/getUserProjects/${token}`)
                    const projectsFromBack = await secondResponse.json();
                    setProjects(projectsFromBack.projects)
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            })();
        }, [])
    );

// console.log('projects', projects)

    const projectName = projects.map((data, i) => {
        return <SmallProjectCard key={i} name={data.name} picture={data.picture} projectId={data._id}/> 
    });

    const kpiData = {
        labels: ["Électricité ⚡", "Isolation ❄️", "Plomberie 💧", "Meuble 🪑"],
        values: [12000, 8000, 2000, 5000]
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.main}>
                <Pressable style={styles.userContainer} onPress={() => navigation.navigate('SkillsScreen', { skillsFromBack })}>
                    <View style={styles.avatarWrapper}>
                        <Image source={{uri: userInfos.avatar}} style={styles.profilePicture} /> 
                    </View>
                    <Text style={styles.helloText}>Hey {name} !</Text>
                </Pressable>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Mes Projets</Text>
                    <TouchableOpacity style={styles.nouveauBtn} onPress={() =>  navigation.navigate('TabNavigator', { screen: 'Projets', params: { screen: 'createProjectTabs' },  params: { screen: 'NewProjectScreen' }})}><Text>Nouveau</Text></TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.projects} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {projectName}
                </ScrollView>
                <Text style={styles.titleDashboard}>Dashboard</Text>
            </View>
            <View style={styles.dashboard}>
                <View style={styles.kpiContainer}>
                        <KPIBox title="Projets en cours" value={projects.length} />
                        <KPIBox title="Tâches complétées" value={`15/36`} />
                </View>
                <View style={styles.KPIColumnChartBox} >
                    <KPIColumnChart  data={kpiData} title="Dépenses par poste de travail" />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        width: '100%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 22,
    },
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 5,
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
        letterSpacing: -1.2,
        color: '#194852',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '600',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 10,
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
        display: 'flex', 
        flexDirection: 'row',
        paddingTop: 25,
        justifyContent: 'space-between',
    }, 
    titleDashboard: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 36,
        letterSpacing: 0.15,
        color: '#194852',
        alignSelf: 'flex-start'
    },
    dashboard: {
        display: 'flex', 
        height: '60%',
        width: '100%',  
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'rgba(41, 157, 142, 0.2)',
        alignItems: 'center',
    },
    kpiContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: '90%',
    },
    KPIColumnChartBox: {
        width: '90%',
    }
});
