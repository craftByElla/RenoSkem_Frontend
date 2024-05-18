import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

function DIYorProScreen() {
    return (
        <SafeAreaView style={styles.main}>
            <Text>DIYorProScreen</Text>
        </SafeAreaView>
    )
}

export default DIYorProScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})