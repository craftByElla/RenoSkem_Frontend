import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LogoTransparent from '../../components/logos/LogoTransparent';

function ProjectsScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <LogoTransparent />
            <TouchableOpacity onPress={() => navigation.navigate('NewProjectScreen')}><Text>go to newProject</Text></TouchableOpacity>
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