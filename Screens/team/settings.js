import {StyleSheet,Text, View, Image,Button,} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const picture = require ("../../assets/Gabin.jpg");

export default function TeammatesSkillsScreen({ navigation }) {

    return (

<View style={styles.TeammatesSkills}>                                            // DIV container 
        <View>                                                                   // DIV pour la fleche gauche de retour
            <FontAwesome name={arrow-left} style={styles.arrowLeft}/>
        </View>
        <View>                                                                   // DIV pour la photo de profil
            <Image source={picture} style={styles.picture}/>  
        </View>
        <View>                                                                   // DIV pour l'icon fermeture
            <FontAwesome name={closecircle} style={styles.closecircle}/>
        </View>
        <View>                                                                   // DIV pour le titre
            <Text style={styles.title}>Paramétrer le niveau d'expertise de Martin</Text>
        </View>
        <View>                                                                   // DIV pour les 3 etoiles
            <FontAwesome name={starWhite} style={styles.starWhite}/>
            <FontAwesome name={starOrange} style={styles.starOrange}/>
            <FontAwesome name={starRed} style={styles.starRed}/>
        </View>
        <View>                                                                   // DIV pour l'ensemble de text + les 3 boutons radio
            <Text>Plomberie</Text>
            // bouton radio left
            // bouton radio center
            // bouton radio right
        </View>
        <View>
            <Text>Electricité</Text>
            // bouton radio left
            // bouton radio center
            // bouton radio right
        </View>
        <View>
            <Text>Menuiserie</Text>
            // bouton radio left
            // bouton radio center
            // bouton radio right
        </View>
        <View>
            <Text>Peinture</Text>
            // bouton radio left
            // bouton radio center
            // bouton radio right
        </View>
        <View>
            <Text>Revêtement de sol</Text>
            // bouton radio left
            // bouton radio center
            // bouton radio right
        </View>
        <View>
            <Text>Maçonnerie</Text>
            // bouton radio left
            // bouton radio center
            // bouton radio right
        </View>
        <View>
            <Text>Installation cuisine / SdB</Text>
            // bouton radio left
            // bouton radio center
            // bouton radio right
        </View>
        <View>
            <Text>Montage de meubles</Text>
            // bouton radio left
            // bouton radio center
            // bouton radio right
        </View>
        <View>
            <Text>Revêtement muraux</Text>
            // bouton radio left
            // bouton radio center
            // bouton radio right
        </View>
        <View>
            <Text>Cloisonnement/Plâtrage</Text>
            // bouton radio left
            // bouton radio center
            // bouton radio right
        </View>
        <View>                                                                       // DIV pour le bouton enregistrer
            <Button style={styles.enregistrer}>Enregistrer</Button>
        </View>
</View>

    );
}

//..................................................................................................................................................................................................
//.............................................................................CSS..................................................................................................................

const styles = StyleSheet.create({

    TeammatesSkills: {

position: "relative",
width: 375,
height: 812,

background: "#EFECEA",
borderRadius: 50,
},



     arrowLeft: {

position: "absolute",
width: 186.34,
height: 40.77,
left: 20,
top: 54,
},



    picture: {

position: "absolute",
width: 68,
height: 64,
left: 149,
top: 42,
background: url(image.png),
borderRadius: 50,
},



    closecircle: {

/* Auto layout */
display: flex,
flexDirection: row,
alignItems: center,
padding: 12,
gap: 10,
position: "absolute",
width: 44,
height: 44,
left: 323,
top: 50,
},



    title: {

position: "absolute",
width: 321,
height: 82,
left: 34,
top: 135,
fontFamily: 'Inter',
fontStyle: 'normal',
fontWeight: 800,
fontSize: 24,
lineHeight: 36,
/* or 150% */
letterSpacing: 0.15,
color: "#194852",
},



    starWhite: {

boxSizing: "border-box",
position: "absolute",
left: "65.87%",
right: "27.47%",
top: "31.28%",
bottom: "65.64%",
border: "1 solid #E76F51",
borderRadius: 1,
},



    starOrange: {

boxSizing: "border-box",

position: "absolute",
left: "76%",
right: "17.33%",
top: "31.28%",
bottom: "65.64%",
background: "rgba(231, 111, 81, 0.5)",
border:"1 solid #E76F51",
borderRadius: 1,
},



    starRed : {

boxSizing: "border-box",
position: "absolute",
left: "85.87%",
right: "7.47%",
top: "31.28%",
bottom: "65.64%",
background: "#E76F51",
border: "1 solid #E76F51",
borderRadius: 1,
},

// style des boutons et text a mettre ici


    enregistrer: {

position: "absolute",
width: 314,
height: 49,
left: "calc(50% - 314/2 + 0.5)",
top: 735,
},





});