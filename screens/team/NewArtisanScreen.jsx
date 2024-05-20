import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

function NewArtisanScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <Text>NewArtisanScreen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TeamScreen')}><Text>go to MyTeamScreen</Text></TouchableOpacity>
        </View>
    )
}

export default NewArtisanScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})