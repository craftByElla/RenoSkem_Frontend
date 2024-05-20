import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView } from 'react-native';
import IconButton from "../../components/buttons/IconButton";
import TwoStep from "../../components/progressIndicator/TwoStep";
import ScreenTitle from "../../components/text/ScreenTitle";
import LogoTransparent from '../../components/logos/LogoTransparent';
import FilledButton from '../../components/buttons/FilledButton';
import TextWithRadioButtons from '../../components/buttons/TextWithRadioButtons'; 
import Stars from '../../components/buttons/Stars';
import { MyLightTheme } from '../../components/Theme';

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

function SetSkills({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.main}>
                        <View style={styles.header}>
                            <IconButton
                                style={styles.iconButton}
                                onPress={() => navigation.navigate('CreateAccount')}
                                iconName="arrow-left"
                            />
                            <LogoTransparent />
                        </View>
                        <View style={styles.progressIndicatorWrapper}>
                            <TwoStep step={2} /> 
                        </View>
                        <ScreenTitle text="Paramétrer votre niveau d’expertise" />
                        <Stars style={styles.stars}  />
                        {/* Ajout des composants radio pour chaque compétence */}
                        <ScrollView style={styles.scrollableSection} contentContainerStyle={styles.scrollableContent}>
                            {postesTravaux.map((poste, index) => (
                                <TextWithRadioButtons key={index} text={poste} />
                            ))}
                        </ScrollView>

                        <View style={styles.buttonContainer}>
                            <FilledButton 
                                text='Enregistrer' 
                                background={MyLightTheme.colors.deepGreen} 
                                full={true}
                                onPress={() => navigation.navigate('TabNavigator', { screen: 'HomeScreen' })}
                            /> 
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default SetSkills;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
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
    stars: {
    
    },
    scrollableSection: {
        flexGrow: 1, // Permettre à la section de grandir pour occuper l'espace disponible
    },
    scrollableContent: {
        alignItems: 'center', // Centrer le contenu horizontalement
    },
    buttonContainer: {
        alignItems: 'center',
        width: "100%",
        marginVertical: 20,
    },
    filledButton: {
        marginVertical: 10, 
    }
});
