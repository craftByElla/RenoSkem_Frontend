import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, SafeAreaView as SafeAreaViewIOS } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import ScreenTitle from '../../components/text/ScreenTitle';
import CustomInput from '../../components/inputs/CustomInput';
import IconButton from '../../components/buttons/IconButton';
import Toast from 'react-native-toast-message';
import StepDisplay from '../../components/cards/StepDisplay';
import { useFocusEffect } from '@react-navigation/native';

const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const ipString = process.env.IP_ADDRESS;

function PlanningScreen({ navigation, route }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { projectId } = route.params;

    const [data, setData] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [reload, setReload] = useState(false); // Nouvel état pour gérer le reload

    const fetchData = async () => {
        try {
            const response = await fetch(`${ipString}/projects/getProjectPlanning/${projectId}`);
            const result = await response.json();
            if (response.ok) {
                setData(result.Planning);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: result.message,
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Erreur lors de la récupération des données',
            });
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [reload])
    );

    const handleCheck = (itemId) => {
        console.log(`Checking item: ${itemId}`);
        setCheckedItems(prevState => {
            const newState = prevState.includes(itemId)
                ? prevState.filter(id => id !== itemId)
                : [...prevState, itemId];
            console.log('Updated checked items:', newState);
            return newState;
        });
    };

    const filteredData = data.map(step => ({
        ...step,
        items: step.items.filter(item =>
            removeAccents(`${item.field} ${item.name || item.type}`).toLowerCase().includes(removeAccents(searchQuery).toLowerCase())
        )
    })).filter(step => step.items.length > 0);  // Filter out steps with no items

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.main}>
                    <View style={styles.biggerContainer}>
                        <View style={styles.titleContainer}>
                            <ScreenTitle style={styles.screenTitle} text="Planification" />
                            <IconButton
                                style={styles.iconButtonRight}
                                onPress={() => console.log("click on filter")}
                                iconName="filter"
                            />
                        </View>
                        <CustomInput
                            placeholder="Rechercher ici"
                            search={true}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    {filteredData.length > 0 ? (
                        <StepDisplay data={filteredData} onCheck={handleCheck} checkedItems={checkedItems} />
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.tentIcon}>🏖️</Text>
                        </View>
                    )}
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
        marginBottom: -10,
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
