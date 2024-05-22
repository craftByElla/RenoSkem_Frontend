import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const picture = require("../../assets/Gabin.jpg");

export default function NewCoworkerScreen({ navigation }) {
    return (
        <View style={styles.newTeammateSkills}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name="long-arrow-left" style={styles.arrowLeft} />
            </TouchableOpacity>
            <View>
                <Image source={picture} style={styles.picture} />
            </View>
            <View>
                <Text style={styles.title}>Créer un nouvel équipier</Text>
            </View>
            <TextInput
                placeholder="Prénom"
                style={styles.inputName}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    newTeammateSkills: {
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
    inputName: {
        position: "absolute",
        width: 311,
        height: 49,
        left: 34,
        top: 250,
        borderBottomWidth: 1,
        borderBottomColor: '#D5CDD2',
        paddingLeft: 10,
    },
});