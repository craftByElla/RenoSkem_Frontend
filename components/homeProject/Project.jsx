import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable} from 'react-native';
import { useTheme } from '@react-navigation/native';
import SimpleModal from '../modal/SimpleModal';
import PlainButton from '../buttons/PlainButton';

function Project(props) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [isShowModal, setIsShowModal] = useState(false);
    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    };

    return (
        <Pressable style={styles.projectContainer} onPress={() => toggleModal()}>
            <Image />
            <Text style={styles.title}>Projet</Text>
            <Text style={styles.projectName}>{props.name}</Text>
            <SimpleModal 
                isShow={isShowModal} 
                toggleModal={toggleModal}
                title={props.name}
                button1={<PlainButton text='1 - Périmètre' style={styles.btn}/>}
                button2={<PlainButton text='2 - Artisans' style={styles.btn}/>}
                button3={<PlainButton text='3 - DYI ou PRO' style={styles.btn}/>}
                button4={<PlainButton text='4 - Planification' style={styles.btn}/>}
            />
        </Pressable>
    )
}

export default Project;

const createStyles = (colors) => StyleSheet.create({
    projectContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 125,
        width: 100,
        borderRadius: 10,
        backgroundColor: colors.modalBackgroundColor,
    },
    title: {
        color: colors.deepGrey,
        letterSpacing: 0.5,
        lineHeight: 19,
    }, 
    projectName: {
        fontWeight: 'bold',
        color: colors.deepGrey,
        letterSpacing: 0.5,
        lineHeight: 19 
    },
    btn: {
        width: '90%',
        margin: 'auto'
    },
})


