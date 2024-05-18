import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

function DiyOrProScreen() {
    return (
        <SafeAreaView style={styles.main}>
            <Text>DIYorProScreen</Text>
        </SafeAreaView>
    )
}

export default DiyOrProScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})