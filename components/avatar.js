import { View } from "react-native";

function Avatar(props) {
  return (
    <View style={styles.container}>                                     // DIV container
      <View>                                                            // DIV pour le prenom
        <Text style={styles.avatarName}>{props.name}</Text>
      </View>
      <View>                                                            // DIV pour la photo
        <Image source={props.image} style={styles.avatarPicture} />
      </View>
    </View>
  );
}

export default Avatar;

const styles = StyleSheet.create({

    container:{

/* Auto layout */
display: flex,
flexDirection: column,
alignItems: center,
padding: 16,
gap: 4,

position: "absolute",
width: 128,
height: 125,
left: 44,
top: 404,

background: "#FFFFFF",
borderRadius: 10,
},


    avatarName:{

width: 84,
height: 19,

fontFamily: 'Inter',
fontStyle: "normal",
fontWeight: 600,
fontSize: 12,
lineHeight: 19,
/* identical to box height, or 158% */
display: flex,
alignItems: center,
textAlign: center,
letterSpacing: 0.5,

color: "#6F797B",


/* Inside auto layout */
flex: none,
order: 0,
flexGrow: 0,
},


    avatarPicture:{

width: 68,
height: 64.73,

background: url(image.png),

/* Inside auto layout */
flex: "none",
order: 1,
flexGrow: 0,
}

});