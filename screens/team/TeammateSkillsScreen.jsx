import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const picture = require("../../assets/Gabin.jpg");

export default function TeammateSkillsScreen({ navigation }) {
    return (
        <View style={styles.TeammateSkills}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name="long-arrow-left" style={styles.arrowLeft} />
            </TouchableOpacity>
            <View>
                <Image source={picture} style={styles.picture} />
            </View>
            <TouchableOpacity onPress={() => console.log('Close')}>
                <FontAwesome name="closecircle" style={styles.closecircle} />
            </TouchableOpacity>
            <View>
                <Text style={styles.title}>Paramétrer le niveau d'expertise de Martin</Text>
            </View>
            <View style={styles.stars}>
                <FontAwesome name="star" style={styles.starWhite} />
                <FontAwesome name="star" style={styles.starOrange} />
                <FontAwesome name="star" style={styles.starRed} />
            </View>
            <View>
                <Text>Plomberie</Text>
            </View>
            <View>
                <Text>Electricité</Text>
            </View>
            <View>
                <Text>Menuiserie</Text>
            </View>
            <View>
                <Text>Peinture</Text>
            </View>
            <View>
                <Text>Revêtement de sol</Text>
            </View>
            <View>
                <Text>Maçonnerie</Text>
            </View>
            <View>
                <Text>Installation cuisine / SdB</Text>
            </View>
            <View>
                <Text>Montage de meubles</Text>
            </View>
            <View>
                <Text>Revêtement muraux</Text>
            </View>
            <View>
                <Text>Cloisonnement/Plâtrage</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.enregistrer}>
                    <Text>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    TeammateSkills: {
        position: "relative",
        width: 375,
        height: 812,
        backgroundColor: "#EFECEA",
        borderRadius: 50,
    },
    arrowLeft: {
        position: "absolute",
        width: 186.34,
        height: 40.77,
        left: 20,
        top: 54,
    },
    picture: {
        position: "absolute",
        width: 68,
        height: 64,
        left: 149,
        top: 42,
        borderRadius: 50,
    },
    closecircle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        gap: 10,
        position: "absolute",
        width: 44,
        height: 44,
        left: 323,
        top: 50,
    },
    title: {
        position: "absolute",
        width: 321,
        height: 82,
        left: 34,
        top: 135,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: "800",
        fontSize: 24,
        lineHeight: 36,
        letterSpacing: 0.15,
        color: "#194852",
    },
    stars: {
        position: "absolute",
        top: 260,
        left: 30,
        right: 30,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    starWhite: {
        color: '#E76F51',
    },
    starOrange: {
        color: 'rgba(231, 111, 81, 0.5)',
    },
    starRed: {
        color: '#E76F51',
    },
    enregistrer: {
        position: "absolute",
        width: 314,
        height: 49,
        left: "calc(50% - 314/2 + 0.5)",
        top: 735,
        backgroundColor: '#194852',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
});