import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Avatar from "../../components/avatar";
import IconButton from "../../components/buttons/IconButton";
import PageTitle from "../../components/text/ScreenTitle"
import LogoTransparent from "../../components/logos/LogoTransparent"
import CustomInput from "../../components/inputs/CustomInput";
import SimpleModal from '../../components/modal/SimpleModal';
import FilledButton from '../../components/buttons/FilledButton'
import PlainButton from '../../components/buttons/PlainButton';

import { useState } from 'react';
import { useTheme } from '@react-navigation/native';

const logo = require("../../assets/splash.png");

export default function TeamScreen({navigation}) {
    const { colors } = useTheme()
    const avatarsData = [
        { name: 'martin', image: require("../../assets/Martin.jpg") },
        { name: 'jc', image: require("../../assets/jc.jpg") },
        { name: 'ella', image: require("../../assets/Ella.jpg") },
        { name: 'gaël', image: require("../../assets/henry.jpg") },
        { name: 'cece', image: require("../../assets/Gabin.jpg") },
    ];

    const avatars = avatarsData.map((data, i) => {
        return <Avatar key={i} name={data.name} image={data.image} onPress={() => navigation.navigate("TeammateSkillsScreen")}/>;
    });

    const [isShowModal, setIsShowModal] = useState(false);
    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    };

    const [isShowModal_2, setIsShowModal_2] = useState(false);
    const toggleModal_2 = () => {
        setIsShowModal_2(!isShowModal_2);
    };


    return (
        <View style={styles.Teammates}>
            <View style={styles.logo}>
                <LogoTransparent/>
            </View>
            <View style={styles.h1}>
                <PageTitle text="Mon équipe"/>
            </View>
            <View style={styles.iconsContainer}>
                <IconButton iconName='plus-circle' onPress={() =>setIsShowModal_2(true) }/>
                <IconButton iconName='filter' onPress={() =>setIsShowModal(true) }/>
            </View>
            <View style={styles.searchContainer}>              
                <CustomInput
                    placeholder="Rechercher"
                    search={true}
                />              
            </View>
            <View style={styles.avatarContainer}>
                {avatars}
            </View>
            <SimpleModal
                isShow={isShowModal} 
                toggleModal={toggleModal}
                title='Filtres'                    
                button1={
                    <FilledButton text='Proches' 
                        background={colors.deepGreen} 
                        full={true} 
                    />
                    
                }
                button2={
                    <View style={{width: "90%" }}>
                    <PlainButton text='Artisans' 
                        background={colors.deepGreen} 
                        full={true} 
                    />
                    </View>
                    
                }
            /> 
            <SimpleModal
                isShow={isShowModal_2} 
                toggleModal={toggleModal_2}
                title="Ajout d'un nouveau "                   
                button1={
                    <FilledButton text='Coéquipier' 
                        onPress={() => navigation.navigate("NewCoworkerScreen")}
                        background={colors.deepGreen} 
                        full={true} 
                    />
                }
                button2={
                        <View style={{width: "90%" }}>
                        <PlainButton text='Artisan' 
                            background={colors.deepGreen} 
                            full={true} 
                    /> 
                    </View>   
                }
                />
        </View>
    );
}

const styles = StyleSheet.create({
    Teammates: {
        position: "relative",
        width: 375,
        height: 812,
        backgroundColor: "#EFECEA",
        borderRadius: 50,
    },

    
    logo: {
        marginTop:50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },


    h1: {
        
        position: "absolute",
        width: 321,
        height: 46,
        left: 34,
        top: 126,
        fontFamily: 'Inter',
        fontStyle:"normal",
        fontWeight: 800,
        fontSize: 24,
        lineHeight: 36,
        letterSpacing: 0.15,
        color: "#194852",


    },

    iconsContainer: {
        flexDirection: 'row',
        position: "absolute",
        top: 118,
        right: 20,
    },
    
    searchContainer: {
        marginTop:50,
        marginLeft:35,
      
    },
    

    avatarContainer: {
        marginTop:50,
        flexDirection:"row",
        flexWrap:"wrap"
    }
  
});