import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LogoTransparent from '../../components/logos/LogoTransparent';
import IconButton from "../../components/buttons/IconButton";
import ScreenTitle from "../../components/text/ScreenTitle";
import PlainButton from '../../components/buttons/PlainButton';

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