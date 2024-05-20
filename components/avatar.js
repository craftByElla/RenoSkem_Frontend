
import {StyleSheet,Text, View, Image,Button,} from "react-native";

function Avatar(props,{navigation}) {
  return (
    <View style={styles.container}>                                   
      <View>                                                           
        <Text style={styles.avatarName}>{props.name}</Text>
      </View>
      <View>                                                         
        <Image source={props.image} style={styles.avatarPicture} onPress={() => navigation.navigate('TeammateSkillsScreen')}/>
      </View>
    </View>
  );
}

export default Avatar;

const styles = StyleSheet.create({
  container: {
      marginTop:15,
      marginLeft:15,
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      width: 128,
      height: 125,
      left: 44,
      top: 404,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
  },
  avatarName: {
      width: 84,
      height: 19,
      fontFamily: 'Inter',
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: 12,
      lineHeight: 19,
      alignItems: "center",
      textAlign: "center",
      letterSpacing: 0.5,
      color: "#6F797B",
      order: 0,
      flexGrow: 0,
  },
  avatarPicture: {
      width: 68,
      height: 64.73,
      order: 1,
      flexGrow: 0,
  },
});

