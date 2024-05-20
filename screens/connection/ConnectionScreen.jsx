import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogoConnexionPage from "../../components/logos/LogoConnexionPage";
import SocialButton from "../../components/buttons/SocialButton";
import Divider from "../../components/dividers/Divider";
import PlainButton from "../../components/buttons/PlainButton"; // Assurez-vous que le chemin est correct

function ConnectionScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <View style={styles.logoContainer}>
                <LogoConnexionPage />
            </View>
            <Text style={styles.sloganEn}>From Vision to Reality, Step by Step</Text>
            <Text style={styles.sloganFr}>Votre assistant pour des rénovations réussies !</Text>
            <View style={styles.buttonsContainer}>
                <SocialButton
                    onPress={() => console.log('Google Sign In')}
                    icon="google"
                    text="Continuer avec Google"
                />
                <SocialButton
                    onPress={() => console.log('Facebook Sign In')}
                    icon="facebook"
                    text="Continuer avec Facebook"
                />
            </View>
            <Divider text="Ou" style={styles.divider} />
            <View style={styles.plainButtonContainer}>
                <PlainButton
                    onPress={() => console.log('Account created')}
                    text="Créez un compte"
                />
                <PlainButton
                    onPress={() => navigation.navigate('TabNavigator')}
                    text="Go to Home"
                />
               
            </View>
            <Text style={styles.policyText}>
                En créant un compte, vous acceptez nos <Text style={styles.linkText}>Conditions</Text> et notre <Text style={styles.linkText}>Politique de confidentialité</Text>.
            </Text>
            <Text style={styles.footerText}>
                Vous avez déjà un compte ? <Text style={styles.footerLinkText} onPress={() => navigation.navigate('Login')}>Connectez-vous</Text>
            </Text>
        </View>
    );
}

export default ConnectionScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#EFECEA',
        paddingTop: 20, // Ajout de padding pour un meilleur espacement en haut
    },
    logoContainer: {
        position: 'absolute',
        top: 60, 
        left: 20, 
    },
    sloganEn: {
        width: 321,
        flexShrink: 0,
        color: '#194852',
        fontFamily: 'Inter',  
        fontSize: 36,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 36, 
        letterSpacing: 0.15, 
        textTransform: 'uppercase', 
        marginTop: 150, // Ajout de marge pour espacer du logo
    },
    sloganFr: {
        color: 'black', 
        textAlign: 'center', 
        fontFamily: 'Inter',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 21, 
        marginLeft: 12,
    },
    buttonsContainer: {
        marginTop: 60, // Ajout de marge pour espacer des slogans
        width: '90%', // Pour s'assurer que les boutons s'étendent sur toute la largeur possible
        alignItems: 'center', // Centrer les boutons horizontalement
        marginBottom: 20,
    },
    
    plainButtonContainer: {
        width: '90%', // Le bouton prend 90% de la largeur de son parent
        alignItems: 'center', // Centre le bouton horizontalement
        marginTop: 25, // Ajoute un peu de marge en haut pour espacer du diviseur
    },
    policyText: {
        width: '80%',
        color: '#6F797B',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 19,
        marginTop: 5, // Ajouter un espacement vertical pour séparer du bouton
    },
    linkText: {
        color: '#D87559',
    },
    footerText: {
        position: 'absolute',
        bottom: 40,
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 21, // 150%
    },
    footerLinkText: {
        color: '#E56F52',
    }
});
