import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, SafeAreaView as SafeAreaViewIOS } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import ScreenTitle from '../../components/text/ScreenTitle';
import CustomInput from '../../components/inputs/CustomInput';
import IconButton from '../../components/buttons/IconButton';
import Toast from 'react-native-toast-message';
import StepDisplay from '../../components/cards/StepDisplay';
import { MyLightTheme } from '../../components/Theme';

const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;

const mockData = [
    {
        step: 1,
        items: [
            {
                id: '1',
                field: "Démolition",
                type: "Cuisine",
                name: null,
                diy: true,
                artisan: null,
                teammates: ["Gael","Cedric","Martin","Ella"],
            },
            {
                id: '2',
                field: "Cloisonnement/Plâtrage",
                type: "Salon",
                name: null,
                diy: false,
                artisan: "C D'LA BALL AGENCEMENT",
                teammates: [],
            },
        ],
    },
    {
        step: 2,
        items: [
            {
                id: '3',
                field: "Électricité",
                type: "Chambre",
                name: "Chambre de bébé",
                diy: true,
                artisan: null,
                teammates: ["Gael","Cedric","Martin","Ella"],
            },
            {
                id: '4',
                field: "Plomberie",
                type: "Salle de bain",
                name: null,
                diy: false,
                artisan: "MariEau",
                teammates: [],
            },
        ],
    },
    {
        step: 3,
        items: [
            {
                id: '5',
                field: "Peinture",
                type: "Bureau",
                name: null,
                diy: true,
                artisan: null,
                teammates: [],
            },
        ],
    },
];


const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function PlanningScreen({ navigation, route }) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { projectId } = route.params;

    const [checkedItems, setCheckedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCheck = (itemId) => {
        setCheckedItems(prevState =>
            prevState.includes(itemId)
                ? prevState.filter(id => id !== itemId)
                : [...prevState, itemId]
        );
    };

    const filteredData = mockData.map(step => ({
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
                                    onPress={console.log("click on filter")}
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
