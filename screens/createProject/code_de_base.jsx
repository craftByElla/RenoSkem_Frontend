import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, SafeAreaView as SafeAreaViewIOS } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import ScreenTitle from '../../components/text/ScreenTitle';
import Toast from 'react-native-toast-message';

import IconButton from "../../components/buttons/IconButton";


const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

const ipString = process.env.IP_ADDRESS;

function PlanningScreen({ navigation, route }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { projectId } = route.params;
    
   

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.main}>
                    <View style={styles.biggerContainer}>
                        <View style={styles.titleContainer}>
                            <ScreenTitle style={styles.screenTitle} text="Planification" />
                        </View>
                        {step.length > 0 ? (
                            <StepDisplay  />
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.tentIcon}>🏖️</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default PlanningScreen;

const createStyles = (colors) => StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    main: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    biggerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 50,
    },
    titleContainer: {
        display: 'flex',
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    emptyContainer: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tentIcon: {
        fontSize: 150,
    },
});
