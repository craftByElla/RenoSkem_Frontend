import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function ProjectsScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => navigation.navigate('NewProject')}><Text>go to newProject</Text></TouchableOpacity>
        </View>
    )
}

export default ProjectsScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})