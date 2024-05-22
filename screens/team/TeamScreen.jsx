import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AvatarCard from "../../components/cards/AvatarCard";
import IconButton from "../../components/buttons/IconButton";
import ScreenTitle from "../../components/text/ScreenTitle"
import LogoTransparent from "../../components/logos/LogoTransparent"
import CustomInput from "../../components/inputs/CustomInput";

const logo = require("../../assets/splash.png");

export default function TeamScreen({ navigation }) {
    const avatarsData = [
        { name: 'martin', image: require("../../assets/Martin.jpg") },
        { name: 'jc', image: require("../../assets/jc.jpg") },
        { name: 'ella', image: require("../../assets/Ella.jpg") },
        { name: 'gaël', image: require("../../assets/henry.jpg") },
        { name: 'cece', image: require("../../assets/Gabin.jpg") },
    ];

    const avatars = avatarsData.map((data, i) => {
        return <AvatarCard key={i} name={data.name} image={data.image} />;
    });

    return (
        <View style={styles.Teammates}>
            <View style={styles.logo}>
                <LogoTransparent/>
            </View>
            <View style={styles.h1}>
                <ScreenTitle text="Mon équipe"/>
            </View>
            <View style={styles.iconsContainer}>
                <IconButton iconName='plus-circle'/>
                <IconButton iconName='filter'/>
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