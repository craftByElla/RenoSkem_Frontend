// components/KPIBox.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const KPIBox = ({ title, value }) => {
    return (
        <View style={styles.kpiContainer}>
            <Text style={styles.kpiTitle}>{title}</Text>
            <Text style={styles.kpiValue}>{value}</Text>
        </View>
    );
};

KPIBox.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const styles = StyleSheet.create({
    kpiContainer: {
        padding: 16,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        alignItems: 'center',
    },
    kpiTitle: {
        fontSize: 16,
        color: '#194852',
    },
    kpiValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#299D8E',
    },
});

export default KPIBox;
