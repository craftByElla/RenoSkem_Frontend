import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import SimpleModal from './SimpleModal';
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
    console.log(`Image URL: ${imageUrl}`);

        // artisans ou teammates.map((data, i) => {
        //    return <View></View>
        //})

    return (
        <TouchableOpacity style={styles.projectContainer} onPress={() => toggleModal()}>
            <Text>Qui Fait quoi ?</Text>
            <Text>Dynamic room</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <View>
                    <Text>Dynamic work</Text>
                </View>
                <View>
                    <Text>DYI</Text>
                    <button></button>
                </View>
                <View>
                    <Text>PRO</Text>
                    <button></button>
                </View>
            </View>
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
        lineHeight: 19 
    },
    btn: {
        width: '90%',
        margin: 'auto'
    },
})
