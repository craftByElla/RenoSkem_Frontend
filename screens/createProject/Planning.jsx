import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

function PlanningScreen() {
    return (
        <SafeAreaView style={styles.main}>
            <Text>PlanningScreen</Text>
        </SafeAreaView>
    )
}

export default PlanningScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})