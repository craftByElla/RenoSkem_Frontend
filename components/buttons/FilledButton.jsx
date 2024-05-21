// components/buttons/FilledButton.js

import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const FilledButton = ({ onPress, text, background, full }) => {
    const styles = createStyles(background);
    const size = full ? '90%' : '50%';

    return (
        <View style={{width: size}}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

FilledButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    full: PropTypes.bool
};

const createStyles = (background) => StyleSheet.create({
    button: {
        backgroundColor: background,
        borderRadius: 100,
        paddingVertical: 14,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    text: {
        color: '#FFF', 
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 21,
        letterSpacing: 0.25
    }
});

export default FilledButton;
