import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'

function PlanningTutoScreen() {
    return (
        <SafeAreaView style={styles.main}>
            <Text>PlanningTutoScreen</Text>
        </SafeAreaView>
    )
}

export default PlanningTutoScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})