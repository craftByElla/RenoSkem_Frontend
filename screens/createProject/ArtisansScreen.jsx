import React, { useState } from 'react'
import { StyleSheet, SafeAreaView as SafeAreaViewIOS, View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import ScreenTitle from '../../components/text/ScreenTitle';
import IconButton from '../../components/buttons/IconButton';
import CustomInput from '../../components/inputs/CustomInput';
import ArtisansScreenModal from '../../components/modal/ArtisansScreenModal';
const ipString = process.env.IP_ADDRESS;
const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

function ArtisanScreen() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModal_2, setIsShowModal_2] = useState(false);
    const toggleModal = (setter, showModal) => {
        setter(!showModal);
    };


    return (
        <SafeAreaView style={styles.main}>  
            <View style={styles.headerContainer}>
                <IconButton iconName='helmet-safety' />
                <ScreenTitle text='Artisans' />
                <IconButton iconName='plus-circle' onPress={() => toggleModal(setIsShowModal_2, isShowModal_2)} />
                <IconButton iconName='filter' onPress={() => toggleModal(setIsShowModal, isShowModal)} />
            </View>
            <View style={styles.customInputnputContainer}>
            <CustomInput placeholder='Rechercher' search={true}/>
            </View>
            <ArtisansScreenModal isShow={isShowModal_2} toggleModal={toggleModal} setter={setIsShowModal_2}/>
        </SafeAreaView>
    )
}

export default ArtisanScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    }, 
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        paddingTop: 10,
    },
    customInputnputContainer: {
        display: 'flex',
        width: '80%',
        alignItems: 'center'
    }
})