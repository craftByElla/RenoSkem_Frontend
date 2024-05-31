import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ArtisansProjectCard(props) {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const workToJobName = {
        "Chauffage": {job: "Chauffagiste", icon: "🔥"},
        "Cloisonnement/Plâtrage": {job: "Plaquiste", icon: "📏"},
        "Démolition": { job: "Maçon", icon: "💣"},
        "Électricité": {job: "Electricien", icon: "⚡"},
        "Étanchéité": {job: "Etancheur", icon:"☔" },
        "Façade": {job: "Façadier", icon: "🏢"},
        "Fondations": {job: "Maçon", icon: "🏗️"},
        "Installation cuisine/SDB": {job: "Installateur", icon:  "🚰"},
        "Isolation": {job: "Plaquiste", icon: "📏"},
        "Maçonnerie": { job: "Maçon", icon:"🧱"},
        "Menuiserie": { job: "Menuisier", icon: "🪚"},
        "Montage de meuble": {job: "Installateur", icon: "🪑"},
        "Peinture": {job: "Peintre", icon: "🎨"},
        "Plomberie": { job: "Plombier", icon : "💧" },
        "Revêtements muraux" : { job: "peintre", icon : "🖼️"},
        "Revêtements sol": { job: "Carreleur", icon : "🦶🏾"},
        "Revêtements extérieurs": { job: "Façadier", icon : "🏡"},
        "Toiture": { job: "Couvreur", icon: "🛠️"},
        "Ventilation": { job: "Couvreur", icon: "🌬️"},
    }

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
        
    <TouchableOpacity style={styles.card} onPress={() => {console.log('ava', props.availability), props.retrieveProjectCardInfos(props.availability, props.quote, props.comment, props.trustLevel, props.artisanId, props.isShow), handleClose()}}>
        <Text>{workToJobName[props.field].icon}</Text>
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
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center', borderWidth: 0.5, borderColor: colors.lightGreen, borderRadius: 5}}>
                <Text>{props.quote}</Text>
                <Text>€</Text>
            </View>
        </View>
        <View style={styles.dispo}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <FontAwesome  name='caret-down' size={24} color={colors.deepGrey}/>
                <Text style={{marginLeft: 5}}>Dispo</Text>
            </View>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center', borderWidth: 0.5, borderColor: colors.lightGreen, borderRadius: 5}}>
                <Text>{extractedDate}</Text>
            </View>
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
        width: '80%',
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
        width: '20%'
    },
    dispo: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
        width: '30%'
    },
})