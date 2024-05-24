import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import SimpleModal from '../modal/SimpleModal';
import PlainButton from '../buttons/PlainButton';

function SmallProjectCard(props) {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const styles = createStyles(colors);
    const [isShowModal, setIsShowModal] = useState(false);
    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    };

    const handleButtonPress = (action) => {
        toggleModal();
        action();
    };

    return (
        <TouchableOpacity style={styles.projectContainer} onPress={() => toggleModal()}>
            <Image source={{ uri: props.picture}} width={40} height={40}/>
            <Text style={styles.projectName}>{props.name}</Text>
            <SimpleModal 
                isShow={isShowModal} 
                toggleModal={toggleModal}
                title={props.name}
                button1={
                    <PlainButton 
                        text='1 - Périmètre' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() =>  navigation.navigate('Projets', { screen: 'CreateProjectTabs', params: { screen: 'RoomsScreen' } }))}
                    />
                }
                button2={
                    <PlainButton 
                        text='2 - Artisans' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() =>  navigation.navigate('Projets', { screen: 'CreateProjectTabs', params: { screen: 'ArtisanScreen' } }))}
                    />
                }
                button3={
                    <PlainButton 
                        text='3 - DYI ou PRO' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() =>  navigation.navigate('Projets', { screen: 'CreateProjectTabs', params: { screen: 'DIYOrProScreen' } }))}
                    />
                }
                button4={
                    <PlainButton 
                        text='4 - Planification' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() =>  navigation.navigate('Projets', { screen: 'CreateProjectTabs', params: { screen: 'PlanningScreen' } }))}
                    />
                }
            />
        </TouchableOpacity>
    )
}

export default SmallProjectCard;

const createStyles = (colors) => StyleSheet.create({
    projectContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 125,
        width: 100,
        borderRadius: 10,
        backgroundColor: colors.modalBackgroundColor,
        marginRight: 10, 
    },
    title: {
        color: colors.deepGrey,
        letterSpacing: 0.5,
        lineHeight: 19,
    }, 
    projectName: {
        fontWeight: 'bold',
        color: colors.deepGrey,
        letterSpacing: 0.5,
        lineHeight: 19 
    },
    btn: {
        width: '90%',
        margin: 'auto'
    },
})
