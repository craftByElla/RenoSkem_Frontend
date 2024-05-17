import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

function MyTeam() {
    return (
        <View style={styles.main}>
            <Text>MyTeam</Text>
        </View>
    )
}

export default MyTeam;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})