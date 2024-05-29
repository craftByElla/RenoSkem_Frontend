import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, SafeAreaView as SafeAreaViewIOS, View, Platform, ScrollView } from 'react-native'
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import ScreenTitle from '../../components/text/ScreenTitle';
import IconButton from '../../components/buttons/IconButton';
import CustomInput from '../../components/inputs/CustomInput';
import ArtisansScreenModal from '../../components/modal/ArtisansScreenModal';
import { useFocusEffect } from '@react-navigation/native';
import ArtisansProjectCard from '../../components/cards/ArtisansProjectCard';
import UpdateArtisansScreenModal from '../../components/modal/UpdateArtisansScreenModal';
const ipString = process.env.IP_ADDRESS;
const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

function ArtisanScreen({route}) {
    const { projectId } = route.params;
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModal_2, setIsShowModal_2] = useState(false);
    const [artisans, setArtisans] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredArtisans, setFilteredArtisans] = useState([])
    const toggleModal = (setter, showModal) => {
        setter(!showModal);
    };
    const [retrievedProjectCardInfos, setRetrievedProjectCardInfos] = useState({})
    let test;
    const retrieveProjectCardInfos = (availability, quote, comment, trustLevel, artisanId) => {
        setRetrievedProjectCardInfos({
            availability: availability,
            quote: quote,
            comment: comment,
            trustLevel: trustLevel,
            artisanId: artisanId,
        })
        test = {
            availability: availability,
            quote: quote,
            comment: comment,
            trustLevel: trustLevel,
        }
        return {retrievedProjectCardInfos, test};
    };

    useFocusEffect(
        useCallback(() => { //permet d'optimiser les performances. A voir dans la doc pour plus de précision en vrai 
            (async () => {
                const response = await fetch(`${ipString}/projects/getProjectArtisans/${projectId}`);
                const data = await response.json();
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
                    setArtisans(data.artisans)
                }
            })();
        }, [])
    );
    // console.log('artisans', artisans)

    const workToJobName = {
        Chauffage: "Chauffagiste",
        CloisonnementPlâtrage: "Plaquiste",
        Démolition: "Maçon",
        Électricité: "Electricien",
        Étanchéité: "Etencheur",
        // Façade: ,
        // Fondations: ,
        // InstallationCuisineSDB: ,
        // Isolation: ,
        Maçonnerie: "Maçon", 
        // Menuiserie: ,
        // MontageDeMeuble: ,
        // Peinture: ,
        Plomberie: "Plombier", 
        // RevêtementsMuraux : ,
        // RevêtementsSol: ,
        // RevêtementsExtérieurs: ,
        Toiture: "Couvreur", 
        Ventilation: "Couvreur",
    }

    useEffect(() => {
        if(search !== ''){
            const searchPattern = new RegExp(search, 'i')
            const filter = artisans.filter(artisan => searchPattern.test(artisan.artisanId.company) || searchPattern.test(workToJobName[artisan.artisanId.field]))
            console.log('filter', searchPattern)
            setFilteredArtisans(filter)
        }else{
            setFilteredArtisans(artisans)
        }
    }, [search, artisans])

    const artisansOnScreen = filteredArtisans?.map((artisan, i) => {
        return <ArtisansProjectCard 
                    key={i} 
                    availability={artisan.availability} 
                    quote={artisan.quote} 
                    comment={artisan.comment}
                    company={artisan.artisanId.company} 
                    field={artisan.artisanId.field} 
                    trustLevel = {artisan.trustLevel}
                    artisanId = {artisan._id}
                    retrieveProjectCardInfos={retrieveProjectCardInfos}
                    isShow={isShowModal}
                    setter={setIsShowModal}
                    toggleModal={toggleModal}
                    // onPress={() => {console.log('retrieve', retrieveProjectCardInfos(artisan.availability)), retrieveProjectCardInfos(artisan.availability, artisan.quote), toggleModal(setIsShowModal, isShowModal)}}
                />
    })

    

    return (
        <SafeAreaView style={styles.main}>  
            <View style={styles.main}>
                <View style={styles.headerContainer}>
                    <IconButton iconName='helmet-safety' />
                    <ScreenTitle text='Artisans' />
                    <IconButton iconName='plus-circle' onPress={() => toggleModal(setIsShowModal_2, isShowModal_2)} />
                    <IconButton iconName='filter' onPress={() => toggleModal(setIsShowModal, isShowModal)} />
                </View>
                <View style={styles.customInputnputContainer}>
                    <CustomInput placeholder='Rechercher' search={true} value={search} onChangeText={(value) => setSearch(value)}/>
                </View>
                <ScrollView style={styles.artisansContainer}>
                    {artisansOnScreen}
                </ScrollView>
            </View>
            <ArtisansScreenModal 
                isShow={isShowModal_2} 
                setter={setIsShowModal_2} 
                toggleModal={toggleModal} 
                projectId={projectId}
            />
            <UpdateArtisansScreenModal 
                isShow={isShowModal}
                setter={setIsShowModal}
                toggleModal={toggleModal}
                retrievedProjectCardInfos={retrievedProjectCardInfos}
                projectId={projectId}
            />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingTop: 10,
    },
    customInputnputContainer: {
        display: 'flex',
        width: '80%',
        alignItems: 'center'
    },
})