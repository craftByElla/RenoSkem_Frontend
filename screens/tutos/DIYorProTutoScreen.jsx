import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

function DIYorProTutoScreen() {
    return (
        <SafeAreaView style={styles.main}>
            <Text>DIYorProTutoScreen</Text>
        </SafeAreaView>
    )
}

export default DIYorProTutoScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})