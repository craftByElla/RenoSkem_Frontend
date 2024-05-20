import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

function ConfigureExpertiseScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <Text>ConfigureExpertiseScreen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TeamScreen')}><Text>go to MyTeamScreen</Text></TouchableOpacity>
        </View>
    )
}

export default ConfigureExpertiseScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})