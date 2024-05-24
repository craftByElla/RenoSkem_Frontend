import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, SafeAreaView as SafeAreaViewIOS, ScrollView } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR} from 'react-native-safe-area-context';
import IconButton from "../../components/buttons/IconButton";
import ScreenTitle from "../../components/text/ScreenTitle";
import LogoTransparent from '../../components/logos/LogoTransparent';
import FilledButton from '../../components/buttons/FilledButton';
import TextWithRadioButtons from '../../components/buttons/TextWithRadioButtons'; 
import Stars from '../../components/buttons/Stars';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
const ipString = process.env.IP_ADDRESS
const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

const postesTravaux = [
    "Chauffage",
    "Cloisonnement/Plâtrage",
    "Démolition",
    "Électricité",
    "Étanchéité",
    "Façade",
    "Fondations",
    "Installation cuisine/SDB",
    "Isolation",
    "Maçonnerie",
    "Menuiserie",
    "Montage de meuble",
    "Peinture",
    "Plomberie",
    "Revêtements muraux",
    "Revêtements sol",
    "Revêtements extérieurs",
    "Toiture",
    "Ventilation"
];



function ChangeSkillsScreen({ navigation }) {
    const { colors } = useTheme();
    const token = useSelector((state) => state.user.userInfos.token)
    const skillsFromStore = useSelector((state) => state.user.userInfos.skills)
    console.log('skillsFromStore', skillsFromStore)

    const [skills, setSkills] = useState(useSelector((state) => state.user.userInfos.skills));
    // const [updatedSkills, setUpdatedSkills]

    // Mise à jour de l'état lorsqu'une compétence est sélectionnée
    const handleSkillChange = (posteIndex, niveau) => {
        const poste = postesTravaux[posteIndex];
        setSkills(prevSkills => ({
            ...prevSkills,
            [poste]: niveau
        }));
    };
    const changeSkills = async () => {
    // Données des compétences
        const skillsData = {
            'chauffage': skills['Chauffage'],
            'cloisonnementPlatrage': skills['Cloisonnement/Plâtrage'],
            'demolition': skills['Démolition'],
            'electricite': skills['Électricité'],
            'etancheite': skills['Étanchéité'],
            'facade': skills['Façade'],
            'fondations': skills['Fondations'],
            'installationCuisineSDB': skills['Installation cuisine/SDB'],
            'isolation': skills['Isolation'],
            'maconnerie': skills['Maçonnerie'],
            'menuiserie': skills['Menuiserie'],
            'montageDeMeuble': skills['Montage de meuble'],
            'peinture': skills['Peinture'],
            'plomberie': skills['Plomberie'],
            'revetementsMuraux': skills['Revêtements muraux'],
            'revetementSol': skills['Revêtements sol'],
            'revetementsExtérieurs': skills['Revêtements extérieurs'],
            'toiture': skills['Toiture'],
            'ventilation': skills['Ventilation']
        };
        const response = await fetch (`${ipString}/skills/editSkills/${token}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(skillsData)
        })
        const data = response.json() // Ligne peut-être pas nécessaire
        if (response.status === 401){
            Toast.show({
                type: 'error',
                text1: 'erreur',
                text2: 'Erreur durant la mise à jour' // TROUVER UN MEILLEUR MESSAGE D'ERREUR
            });
        }else if (response.status === 500){
            Toast.show({
                type: 'error',
                text1: 'erreur',
                text2: 'Erreur durant la mise à jour'
            });
        }else if (response.status === 200){
            Toast.show({
                type: 'success',
                text1: 'succès',
                text2: 'Compétences enregistrées'
            });
        }
        navigation.navigate('SkillsScreen')
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <IconButton
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('SkillsScreen')}
                        iconName="long-arrow-left"
                    />
                    <LogoTransparent />
                </View>
                <ScreenTitle text="Paramétrer votre niveau d’expertise" />
                <Stars style={styles.stars}  />
                {/* Ajout des composants radio pour chaque compétence */}
                <ScrollView style={styles.scrollableSection} contentContainerStyle={styles.scrollableContent}>
                    {postesTravaux.map((poste, index) => (
                        <TextWithRadioButtons
                            key={index} 
                            text={poste} 
                            selectedButton={skills[poste]} 
                            handlePress={handleSkillChange} 
                            index={index}
                        />
                    ))}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <FilledButton 
                        text='Enregistrer' 
                        background={colors.deepGreen} 
                        full={true}
                        onPress={() =>  changeSkills() }
                    /> 
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ChangeSkillsScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    main: {
        height: '100%',
        width: '100%',
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
    },
    iconButton: {
        position: 'absolute', 
        left: 20, 
        top: '50%', 
        marginTop: -25, 
    },
    progressIndicatorWrapper: {
        marginTop: 20,
        marginBottom: 30,
    },
    UserPictureWrapper: {
        marginTop: 10,
        marginBottom: 10,
    },
    scrollableContent: {
        alignItems: 'center', // Centrer le contenu horizontalement
    },
    buttonContainer: {
        alignItems: 'center',
        width: "100%",
    },
    filledButton: {
        marginVertical: 10, 
    }
});
