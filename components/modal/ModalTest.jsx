import React from 'react';
import { StyleSheet, Modal, Text, View, SafeAreaView, TouchableOpacity, Image, Pressable} from 'react-native';
import { MyLightTheme } from '../Theme';
import Entypo from 'react-native-vector-icons/Entypo';


function ModalTest(props) {
    const styles = createStyles(MyLightTheme, props)

    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={props.isShow}
            onRequestClose={props.toggleModal}
            onBackdropPress={() => console.log('test')}
            
        >
            <Pressable style={styles.modalContainer} onPress={() => props.toggleModal()} >
                <View style={styles.modal} >
                    <View style={ styles.textLine }>
                        <Text style={styles.text}>{props.title}</Text>
                        <TouchableOpacity 
                            onPress={() => props.toggleModal()}                         
                        >
                            <Entypo 
                                name='cross'   
                                size={40} 
                                color={'#6F797B'} 
                            />
                        </TouchableOpacity>
                    </View>
                    {props.button1}
                    {props.button2}
                    {props.button3}
                </View>
            </Pressable>
        </Modal>
    )
}

export default ModalTest;

const createStyles = (MyLightTheme, props) => StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        
    },
    modal: {
        width: '90%',
        backgroundColor: MyLightTheme.colors.modalBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingBottom: 20
    },
    textLine: {
        flexDirection: 'row', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: props.title ? 'space-between' : 'flex-end',
        paddingRight: 24,
        paddingLeft: props.title ? 24 : 0,
    },
    text: {
        fontWeight: 600,
        fontSize: 'normal',
        fontSize: 20,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#194852',
        justifySelf: 'flex-start'
    },
})


