import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView as SafeAreaViewIOS, View, Platform, TouchableOpacity, ScrollView, Text } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import ScreenTitle from '../../components/text/ScreenTitle';
import IconButton from '../../components/buttons/IconButton';
import CustomInput from '../../components/inputs/CustomInput';
import ArtisansScreenModal from '../../components/modal/ArtisansScreenModal';
import { useFocusEffect } from '@react-navigation/native';
import ArtisansProjectCard from '../../components/cards/ArtisansProjectCard';
import UpdateArtisansScreenModal from '../../components/modal/UpdateArtisansScreenModal';
import Toast from 'react-native-toast-message';

const ipString = process.env.IP_ADDRESS;
const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

function ArtisanScreen({ route }) {
    const { projectId } = route.params;
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModal_2, setIsShowModal_2] = useState(false);
    const [artisans, setArtisans] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredArtisans, setFilteredArtisans] = useState([]);
    const [reload, setReload] = useState(false); // Nouvel état pour gérer le reload
    const [retrievedProjectCardInfos, setRetrievedProjectCardInfos] = useState({});

    const toggleModal = (setter) => {
        setter(prev => !prev);
    };

    const retrieveProjectCardInfos = (availability, quote, comment, trustLevel, artisanId, isShow) => {
        setRetrievedProjectCardInfos({
            availability,
            quote,
            comment,
            trustLevel,
            artisanId,
            isShow,
        });
    };

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await fetch(`${ipString}/projects/getProjectArtisans/${projectId}`);
                const data = await response.json();
                if (response.status === 500) {
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: 'Erreur pendant l\'envoi'
                    });
                } else if (response.status === 401) {
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: 'Projet introuvable'
                    });
                } else {
                    setArtisans(data.artisans);
                }
            })();
        }, [reload])
    );

    useEffect(() => {
        if (search !== '') {
            const searchPattern = new RegExp(search, 'i');
            const filter = artisans.filter(artisan =>
                searchPattern.test(artisan.artisanId.company) || searchPattern.test(workToJobName[artisan.artisanId.field])
            );
            setFilteredArtisans(filter);
        } else {
            setFilteredArtisans(artisans);
        }
    }, [search, artisans]);

    const artisansOnScreen = filteredArtisans?.map((artisan, i) => {
        return (
            <ArtisansProjectCard
                key={i}
                availability={artisan.availability}
                quote={artisan.quote}
                comment={artisan.comment}
                company={artisan.artisanId.company}
                field={artisan.artisanId.field}
                trustLevel={artisan.trustLevel}
                artisanId={artisan._id}
                retrieveProjectCardInfos={retrieveProjectCardInfos}
                isShow={isShowModal}
                setter={setIsShowModal}
                toggleModal={toggleModal}
            />
        );
    });

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.main}>
                <View style={styles.biggerContainer}>
                    <View style={styles.titleContainer}>
                        <ScreenTitle style={styles.screenTitle} text="Artisans" />
                        <TouchableOpacity style={styles.addBtn} onPress={() => toggleModal(setIsShowModal_2)}>
                            <Text>Ajouter un artisan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.customInputContainer}>
                    <CustomInput placeholder='Rechercher' search={true} value={search} onChangeText={(value) => setSearch(value)} />
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
                onClose={() => setReload(prev => !prev)} // Ajouter un callback onClose pour déclencher le reload
            />
            <UpdateArtisansScreenModal
                isShow={isShowModal}
                setter={setIsShowModal}
                toggleModal={toggleModal}
                retrievedProjectCardInfos={retrievedProjectCardInfos}
                projectId={projectId}
                onClose={() => setReload(prev => !prev)} // Ajouter un callback onClose pour déclencher le reload
            />
        </SafeAreaView>
    );
}

export default ArtisanScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    biggerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    titleContainer: {
        display: 'flex',
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#299D8E',
        borderRadius: 8,
        height: 25,
        width: '40%',
    },
    customInputContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center'
    },
    artisansContainer: {
        width: '100%',
    }
});
