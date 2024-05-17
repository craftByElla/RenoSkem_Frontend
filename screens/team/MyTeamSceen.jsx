import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

function MyTeamScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => navigation.navigate('NewArtisanScreen')}><Text>go to NewArtisanScreen</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('NewCoworkerScreen')}><Text>go to NewCoworkerScreen</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ConfigureExpertiseScreen')}><Text>go to ConfigureExpertiseScreen</Text></TouchableOpacity>
        </View>
    )
}

export default MyTeamScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})