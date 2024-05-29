import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import SimpleModal from '../modal/SimpleModal';
import PlainButton from '../buttons/PlainButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ArtisansProjectCard(props) {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const workToJobName = {
        Chauffage: {job: "Chauffagiste", icon: <MaterialCommunityIcons name='snowflake' size={24} color={colors.deepGreen}/>},
        CloisonnementPlâtrage: {job: "Plaquiste", icon: 'test'},
        Démolition: { job: "Maçon", icon: <MaterialCommunityIcons  name='hammer' size={24} color={colors.deepGreen}/>},
        Électricité: {job: "Electricien", icon: <MaterialCommunityIcons name='lignting-bolt' size={24} color={colors.deepGreen}/> },
        Étanchéité: {job: "Etencheur", icon: <MaterialCommunityIcons name='lignting-bolt' size={24} color={colors.deepGreen}/> },
        // Façade: ,
        // Fondations: ,
        // InstallationCuisineSDB: ,
        // Isolation: ,
        Maçonnerie: { job: "Maçon", icon: <MaterialCommunityIcons  name='hammer' size={24} color={colors.deepGreen}/>},
        // Menuiserie: ,
        // MontageDeMeuble: ,
        // Peinture: ,
        Plomberie: { job: "Plombier", icon : <MaterialCommunityIcons name='pipe' size={24} color={colors.deepGreen}/> },
        // RevêtementsMuraux : ,
        // RevêtementsSol: ,
        // RevêtementsExtérieurs: ,
        Toiture: { job: "Couvreur", icon: <MaterialCommunityIcons  name='hammer' size={24} color={colors.deepGreen}/>},
        Ventilation: { job: "Couvreur", icon: <MaterialCommunityIcons  name='hammer' size={24} color={colors.deepGreen}/>},
    };

    const [isShowModal, setIsShowModal] = useState(false);
    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    };
    const test = props.availability

    const date = props.availability;
    const pattern = /^\d{4}-\d{2}-\d{2}/;
    const match = date.match(pattern);
    const extractedDate = match ? match[0] : '';

    const stars = [];
    for (let i = 0; i < props.trustLevel; i++) {
        stars.push(<FontAwesome key={i} name='star' color='orange' />)
    }

    if (props.search){
        const matchSearch = workToJobName[props.field].job.match(props.search)
        console.log('matchSearch', matchSearch)
    }
    
    const handleClose = () => {
        props.toggleModal(props.setter, props.isShow);
    };
    return (
        
    <TouchableOpacity style={styles.card} onPress={() => {console.log('ava', props.availability), console.log('retrieve', props.retrieveProjectCardInfos(props.availability, props.quote, props.comment, props.trustLevel, props.artisanId)), handleClose()}}>
        {workToJobName[props.field].icon}
        <View style={{ width: '35%', display: 'flex', justifyContent: 'center' }}>
                <Text>{workToJobName[props.field].job}</Text>
                <Text>{props.company}</Text>
                <View style={styles.starsContainer}>
                    {stars}
                </View>
        </View>
        <View style={styles.devis}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <FontAwesome  name='caret-down' size={24} color={colors.deepGrey}/>
                <Text style={{marginLeft: 5}}>Devis</Text>
            </View>
            <Text>{props.quote}</Text>
        </View>
        <View style={styles.dispo}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <FontAwesome  name='caret-down' size={24} color={colors.deepGrey}/>
                <Text style={{marginLeft: 5}}>Dispo</Text>
            </View>
            <Text>{extractedDate}</Text>
        </View>
        
    </TouchableOpacity>
    )
}


export default ArtisansProjectCard;

createStyles = (colors) => StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.modalBackgroundColor,
        marginTop: 10, 
        paddingVertical: 5,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,

    },
    starsContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    devis: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
    },
    dispo: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
    },
})