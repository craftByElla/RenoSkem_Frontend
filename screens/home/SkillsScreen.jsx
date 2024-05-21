import React from 'react'
import { StyleSheet, View, SafeAreaView, Image, Text } from 'react-native';
import IconButton from '../../components/buttons/IconButton';
import PlainButton from '../../components/buttons/PlainButton';
import { useTheme } from '@react-navigation/native';
import SpiderChart from '../../components/homeProject/SpiderChart';


function SkillsScreen({ navigation }) {
    const { colors } = useTheme()
    const styles = createStyles(colors)

    return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
            <IconButton
                style={styles.iconButton}
                onPress={() => navigation.navigate('HomeScreen')}
                iconName="long-arrow-left"
            />
            <Image source={require('../../assets/Leyla.png')} style={styles.profilePicture} /> 
            <Text>Leyla</Text>
            <IconButton 
                onPress={() => navigation.navigate('ChangeInformationsScreen')}
                iconName='ellipsis-h'
            /> 
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Mes compétences</Text>
            <PlainButton text='Modifier' onPress={() => console.log('clic sur modifier')}/> 
        </View>
        <SpiderChart />
    </SafeAreaView>
    )
}

export default SkillsScreen;

const createStyles = (colors) => StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 20,
    },
    iconButton: {
        alignSelf: 'flex-start'
    },
    titleContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    profilePicture: {
        height: 50,
        width: 50,
    },
    title: {
        fontWeight: 800,
        fontSize: 18,
        fontStyle: 'normal',
        lineHeight: 36,
        letterSpacing: 0.15,
        color: colors.deepGreen,
    },
})



