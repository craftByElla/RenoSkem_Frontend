import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

function NewCoworkerScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <Text>NewCoworkerScreen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TeamScreen')}><Text>go to MyTeamScreen</Text></TouchableOpacity>
        </View>
    )
}

export default NewCoworkerScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})