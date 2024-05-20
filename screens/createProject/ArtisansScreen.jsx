import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

function ArtisanScreen() {
    return (
        <SafeAreaView style={styles.main}>
            <Text>ArtisanScreen</Text>
        </SafeAreaView>
    )
}

export default ArtisanScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})