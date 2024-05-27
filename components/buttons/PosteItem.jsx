import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextWithRadioButtons from './TextWithRadioButtons';

const PosteItem = ({ text, selectedButton, handlePress, index, onRemove }) => {
    return (
        <View style={styles.posteContainer}>
            <TextWithRadioButtons
                text={text}
                selectedButton={selectedButton}
                handlePress={handlePress}
                index={index}
            />
            <TouchableOpacity onPress={onRemove}>
                <FontAwesome name="close" size={20} color="#FF0000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    posteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 8,
    },
});

export default PosteItem;
