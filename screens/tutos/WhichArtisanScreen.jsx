import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

function WhichArtisanScreen() {
    return (
        <SafeAreaView style={styles.main}>
            <Text>WhichArtisanScreen</Text>
        </SafeAreaView>
    )
}

export default WhichArtisanScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})