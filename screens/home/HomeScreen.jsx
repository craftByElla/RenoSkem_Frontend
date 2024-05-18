import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import Project from '../../components/homescreen/Project';

function HomeScreen({ navigation }) {

    const projectNames = [
        'Maison2.0',
        'Chez Papy', 
        'Mezzanine',
    ]

    const projectName = projectNames.map((data, i ) => {
        return <Project key={i} name={data}/> 
    })
    return (
        <SafeAreaView style={{flex: 1,}}>
            <View style={styles.main}>
                <View style={styles.userContainer}>
                    <Image /> 
                    <Text style={styles.helloText}>Hey Leyla !</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Mes Projets</Text>
                    <TouchableOpacity style={styles.nouveauBtn}><Text>Nouveau</Text></TouchableOpacity>
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
        paddingHorizontal: 22,
    },
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    helloText: {
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
        borderColor: 'red',
        borderWidth: 1,
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
        height: '50%',  
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'rgba(41, 157, 142, 0.2)',
    },
})


