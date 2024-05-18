import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

function WhereToStartScreen() {
    return (
        <SafeAreaView style={styles.main}>
            <Text>WhereToStartScreen</Text>
        </SafeAreaView>
    )
}

export default WhereToStartScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})