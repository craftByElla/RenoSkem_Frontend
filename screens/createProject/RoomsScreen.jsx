import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

function RoomsScreen() {
    return (
        <SafeAreaView style={styles.main}>
            <Text>RoomsScreen</Text>
        </SafeAreaView>
    )
}

export default RoomsScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})