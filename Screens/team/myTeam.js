import {StyleSheet,Text, View, Image,TextInput,Button,} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Avatar from "../../../components/avatar";

const logo = require("../../../assets/images/splash.png");

const logo = require("../../assets/Gabin.jpg");

export default function teamScreen({ navigation }) {
    
    const avatarsData = [
        { name: 'martin', image:"../../assets/Martin.jpg"},
        { name: 'jc', image:"../../assets/jc.jpg"},                               // création d'un tableau en dur d'equipier
        { name: 'ella', image:"../../assets/Ella.jpg" },
        { name: 'gaël', image:"../../assets/henry.jpg"},
        { name: 'cece', image:"../../assets/Gabin.jpg" }]

        const avatars = avatarsData.map((data, i) => {
            return <Avatar key={i} name={data.name} image={data.image}/>;        // methode .map pour generer plusieur equipier avec le composant Avatar
          });


    return (
        <View style={styles.Teammates}>                                          // DIV container
            <View>                                                               // DIV pour le logo
                <Image source={logo} style={styles.logo}/>    
            </View>
            <View>                                                               // DIV pour le titre
                <Text style={styles.h1}>Mon équipe</Text>     
            </View>
            <View>                                                               // DIV pour les logos filtre + ajout
                <FontAwesome name={plus-circle} style={styles.plusCircle}/>
                <FontAwesome name={filter} style={styles.filter}/>
            </View>
            <View style={styles.searchContainer}>
            <View>                                                               // DIV pour le logo loupe
            <FontAwesome name={search} style={styles.search}/>
            </View>
            </View>                                        
                <TextInput 
                    value={Rechercher}
                    placeholder="Rechercher"
                    onChangeText={(Rechercher)}
                    style={styles.inputSearch}
                />
            <View>                               
                <avatars/>                                                        // rappel du composant Avatar
            </View> 
        </View>
    )
};

//...............................................................................................................................................................................................
//............................................................................partie CSS.........................................................................................................


const styles = StyleSheet.create({

    Teammates:{

position: "relative",
width: 375,
height: 812,

background: "#EFECEA",
borderRadius: 50,
},

     logo:{

position: "absolute",
width: 35.34,
height: 40.77,
left: 171,
top: 54,
},
        
    h1:{

position: "absolute",
width: 321,
height: 46,
left: 34,
top: 126,

fontFamily: 'Inter',
fontStyle: "normal",
fontWeight: 800,
fontSize: 24,
lineHeight: 36,
/* or 150% */
letterSpacing: 0.15,

color: "#194852",
},
  
     plusCircle:{

position: "absolute",
width: 48,
height: 48,
left: 259,
top: 118,
},

     filter:{

position: "absolute",
width: 48,
height: 48,
left: 307,
top: 118,
},

    searchContainer:{

position: "absolute",
width: 313,
height: 49,
left: 32,
top: 166,
},

     search:{

position: "absolute",
width: 24,
height: 24,
left: 32,
top: 179,
},

     inputSearch:{

position: "absolute",
width: 311,
height: 49,
left: 34,
top: 166,
},

})