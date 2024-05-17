import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

function NewProjectScreen({ navigation  }) {
    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => navigation.navigate('ProjectsScreen')}><Text>go to Project</Text></TouchableOpacity>
        </View>
    )
}

export default NewProjectScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})