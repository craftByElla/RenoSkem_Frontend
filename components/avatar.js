
import {StyleSheet,Text, View, Image,Button,} from "react-native";

function Avatar(props) {
  return (
    <View style={styles.container}>                                   
      <View>                                                           
        <Text style={styles.avatarName}>{props.name}</Text>
      </View>
      <View>                                                         
        <Image source={props.image} style={styles.avatarPicture} />
      </View>
    </View>
  );
}

export default Avatar;

const styles = StyleSheet.create({
  container: {
      flexDirection: "column",
      alignItems: "center",
      padding: 16,
      gap: 4,
      position: "absolute",
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

