// components/buttons/FilledButton.js

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const FilledButton = ({ onPress, text, background, full, style }) => {
    const styles = createStyles(background);
    const sizeStyle = full ? { width: '90%' } : { width: '50%' };

    return (
        <TouchableOpacity style={[styles.button, sizeStyle, style]} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

FilledButton.propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    full: PropTypes.bool,
    style: PropTypes.object, // Accept external styles
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
