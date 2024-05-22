import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context" 
import { useTheme } from '@react-navigation/native';
import LogoTransparent from '../../components/logos/LogoTransparent';
import IconButton from "../../components/buttons/IconButton";
import ScreenTitle from "../../components/text/ScreenTitle";
import ProjectPicture from "../../components/images/ProjectPicture";
import CustomInput from '../../components/inputs/CustomInput';


function ProjectsScreen({ navigation }) {
    const { colors } = useTheme()
    const styles = createStyles(colors)


  

    return (
        <SafeAreaView style={styles.safeArea}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.header}>
                            <IconButton
                                style={styles.iconButtonLeft}
                                onPress={() => navigation.navigate('TutoStack', { screen: 'WhereToStartScreen' })}
                                iconName="info-circle"
                            />
                            <LogoTransparent />
                            <IconButton
                                style={styles.iconButtonRight}
                                onPress={() => console.log("modale filtre à faire")}
                                iconName="filter"
                            />
                        </View>
                        <View style={styles.titleContainer}>
                            <ScreenTitle style={styles.ScreenTitle} text="Mes projets" />
                            <TouchableOpacity style={styles.nouveauBtn} onPress={() => navigation.navigate('NewProjectScreen')}>
                                <Text>Nouveau</Text>
                            </TouchableOpacity>
                        </View>
                        <CustomInput placeholder="Rechercher ici" search={true} />
                        
                    </ScrollView>
        </SafeAreaView>
    )
}

export default ProjectsScreen;

const createStyles = (colors) => StyleSheet.create({
    safeArea: {
        flex: 1,
        width: "100%"
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        position: 'relative',
        marginBottom: 30,
    },
    iconButtonLeft: {
        position: 'absolute', 
        left: 25, 
        top: '50%', 
        marginTop: -25, 
    },
    iconButtonRight: {
        position: 'absolute', 
        right: 20, 
        top: '50%', 
        marginTop: -25, 
    },  
    titleContainer: {
        display: 'flex',
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
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
    input: {
        flexGrow: 1,
    },
    buttonContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: "10%",
    },
    filledButton: {
        marginVertical: 10, 
    }
});