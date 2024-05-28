import React, { useState, useCallback } from 'react'
import { StyleSheet, SafeAreaView as SafeAreaViewIOS, View, Platform, } from 'react-native'
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import ScreenTitle from '../../components/text/ScreenTitle';
import IconButton from '../../components/buttons/IconButton';
import CustomInput from '../../components/inputs/CustomInput';
import ArtisansScreenModal from '../../components/modal/ArtisansScreenModal';
import { useFocusEffect } from '@react-navigation/native';
const ipString = process.env.IP_ADDRESS;
const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

function ArtisanScreen({route}) {
    const { projectId } = route.params;
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModal_2, setIsShowModal_2] = useState(false);
    const [artisans, setArtisans] = useState([])
    const toggleModal = (setter, showModal) => {
        setter(!showModal);
    };
    console.log('projectId', projectId)

    useFocusEffect(
        useCallback(() => { //permet d'optimiser les performances. A voir dans la doc pour plus de précision en vrai 
            (async () => {
                const response = fetch(`${ipString}/getProjectArtisans`)
                if (response.status === 500){
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: 'Erreur pendant l\'envoie'
                    });
                }else if (response.status === 401) {
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: 'Aucun artisan'
                    });
                }else {
                    setArtisans(response.json().artisans)
                }
            })();
        }, [])
    );
    console.log('artisans', artisans)

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
            <ArtisansScreenModal isShow={isShowModal_2} toggleModal={toggleModal} setter={setIsShowModal_2} projectId={projectId}/>
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