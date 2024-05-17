import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

function ConnectionScreen({ navigation }) {
    return (
    <View style={styles.main}>
        <Text>CONNECTION</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')}><Text>go to HomeScreen</Text></TouchableOpacity>
    </View>
    )
}

export default ConnectionScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})