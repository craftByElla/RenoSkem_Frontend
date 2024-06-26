import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import SimpleModal from '../modal/SimpleModal';
import PlainButton from '../buttons/PlainButton';

const ipString = process.env.IP_ADDRESS;

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

    const getProjectImageUrl = (imageName) => {
        if (!imageName) {
            return null;
        }
        return `${ipString}/assets/${imageName}`;
    };

    const imageUrl = getProjectImageUrl(props.picture);
    // console.log(`Image URL: ${imageUrl}`);


    return (
        <TouchableOpacity style={styles.projectContainer} onPress={() => toggleModal()}>
            <Image source={{ uri: imageUrl }} width={50} height={50}/>
            <Text style={styles.projectName} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
            <SimpleModal 
                isShow={isShowModal} 
                toggleModal={toggleModal}
                title={props.name}
                button1={
                    <PlainButton 
                        text='1 - Périmètre' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() =>  navigation.navigate('Projets', { screen: 'CreateProjectTabs', params: { screen: 'RoomsScreen', projectId: props.projectId } }))}
                    />
                }
                button2={
                    <PlainButton 
                        text='2 - Artisans' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() =>  navigation.navigate('Projets', { screen: 'CreateProjectTabs', params: { screen: 'ArtisanScreen', projectId: props.projectId } }))}
                    />
                }
                button3={
                    <PlainButton 
                        text='3 - DYI ou PRO' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() =>  navigation.navigate('Projets', { screen: 'CreateProjectTabs', params: { screen: 'DIYOrProScreen', projectId: props.projectId } }))}
                    />
                }
                button4={
                    <PlainButton 
                        text='4 - Planification' 
                        style={styles.btn} 
                        onPress={() => handleButtonPress(() =>  navigation.navigate('Projets', { screen: 'CreateProjectTabs', params: { screen: 'PlanningScreen', projectId: props.projectId } }))}
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
        height: 100,
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
        lineHeight: 19 ,
        paddingHorizontal: 10,
        marginTop: -10,
    },
    btn: {
        width: '90%',
        margin: 'auto'
    },
})
