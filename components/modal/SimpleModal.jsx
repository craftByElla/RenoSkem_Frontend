import React from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";

function SimpleModal(props) {
  const { colors } = useTheme();
  const styles = createStyles(colors, props);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={props.isShow} // true or false
      onRequestClose={props.toggleModal}
    >
      <Pressable
        style={styles.modalContainer}
        onPress={() => props.toggleModal()}
      >
        <View style={styles.modal}>
          <View style={styles.textLine}>
            <Text style={styles.text}>{props.title}</Text>
            <TouchableOpacity onPress={() => props.toggleModal()}>
              <Entypo name="cross" size={40} color={"#6F797B"} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnwrapper}>
          {props.button1}
          </View>
          <View style={styles.btnwrapper}>
          {props.button2}
          </View>
          <View style={styles.btnwrapper}>
          {props.button3}
          </View>
          <View style={styles.btnwrapper}>
          {props.button4}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

export default SimpleModal;

const createStyles = (colors, props) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modal: {
      width: "90%",
      backgroundColor: colors.modalBackgroundColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      paddingBottom: 20,
    },
    textLine: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: props.title ? "space-between" : "flex-end",
      paddingRight: 24,
      paddingLeft: props.title ? 24 : 0,
      marginTop: 10,
      marginBottom: 10,
    },
    text: {
      fontWeight: "600",
      fontSize: "normal",
      fontSize: 20,
      lineHeight: 21,
      letterSpacing: 0.25,
      color: "#194852",
    },
    btnwrapper: {
      marginBottom: 10,
      alignItems: 'center',
      width: '90%'
    }
  });
