import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import PlainButton from '../buttons/PlainButton';
import FilledButton from '../buttons/FilledButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FilterModalDIYPRO = ({ isVisible, onClose, onApplyFilters, roomTypes, workTypes, currentFilters }) => {
    const { colors } = useTheme();
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
    const [selectedDIY, setSelectedDIY] = useState('Voir tout');

    useEffect(() => {
        if (isVisible) {
            setSelectedRoomTypes(currentFilters.roomTypes);
            setSelectedWorkTypes(currentFilters.workTypes);
            setSelectedDIY(currentFilters.diy || 'Voir tout');
        }
    }, [isVisible, currentFilters]);

    const toggleRoomType = (type) => {
        if (type === 'Voir tout') {
            setSelectedRoomTypes(roomTypes);
        } else {
            setSelectedRoomTypes((prev) =>
                prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
            );
        }
    };

    const toggleWorkType = (type) => {
        if (type === 'Sans type') {
            setSelectedWorkTypes((prev) =>
                prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
            );
        } else {
            setSelectedWorkTypes((prev) =>
                prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
            );
        }
    };

    const handleDIYToggle = (type) => {
        if (type === 'Voir tout') {
            setSelectedDIY(type);
        } else {
            setSelectedDIY((prev) =>
                prev === type ? 'Voir tout' : type
            );
        }
    };

    const handleApplyFilters = () => {
        const appliedFilters = {
            roomTypes: selectedRoomTypes,
            workTypes: selectedWorkTypes,
            diy: selectedDIY
        };
        onApplyFilters(appliedFilters);
        onClose();
    };

    const handleResetFilters = () => {
        setSelectedRoomTypes(roomTypes);
        setSelectedWorkTypes([...workTypes, 'Sans type']);
        setSelectedDIY('Voir tout');
        const resetFilters = { roomTypes, workTypes: [...workTypes, 'Sans type'], diy: 'Voir tout' };
        onApplyFilters(resetFilters);
        onClose();
    };

    const renderCheckbox = (label, selected, onPress, key) => (
        <TouchableOpacity key={key} style={styles.checkboxContainer} onPress={onPress}>
            <FontAwesome
                name={selected ? 'dot-circle-o' : 'circle-o'}
                size={24}
                color={selected ? colors.lightGreen : colors.deepGreen}
                style={styles.icon}
            />
            <Text style={[styles.checkboxLabel, { color: colors.deepGreen }]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContainer, { backgroundColor: colors.modalBackgroundColor }]}>
                    <View style={styles.textLine}>
                        <Text style={styles.text}>Filtrer le récapitulatif</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Entypo name="cross" size={40} color={"#6F797B"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scrollViewContainer}>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <Text style={[styles.sectionTitle, styles.text]}>DIY ou PRO</Text>
                            {renderCheckbox('Voir tout (diy et pro)', selectedDIY === 'Voir tout', () => handleDIYToggle('Voir tout'), 'voir_tout_diy')}
                            {renderCheckbox('DIY', selectedDIY === 'DIY' || selectedDIY === 'Voir tout', () => handleDIYToggle('DIY'), 'diy')}
                            {renderCheckbox('PRO', selectedDIY === 'PRO' || selectedDIY === 'Voir tout', () => handleDIYToggle('PRO'), 'pro')}

                            <Text style={[styles.sectionTitle, styles.text]}>Type de Pièce</Text>
                            {renderCheckbox('Voir tout', selectedRoomTypes.length === roomTypes.length, () => toggleRoomType('Voir tout'), 'voir_tout_room')}
                            {roomTypes.map((type, index) =>
                                renderCheckbox(type, selectedRoomTypes.includes(type), () => toggleRoomType(type), index)
                            )}
                            <Text style={[styles.sectionTitle, styles.text]}>Type de Travaux</Text>
                            {renderCheckbox('Sans type', selectedWorkTypes.includes('Sans type'), () => toggleWorkType('Sans type'), 'sans_type_work')}
                            {workTypes.map((type, index) =>
                                renderCheckbox(type, selectedWorkTypes.includes(type), () => toggleWorkType(type), index)
                            )}
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <PlainButton text="Réinitialiser" onPress={handleResetFilters} />
                        <FilledButton text="Appliquer" onPress={handleApplyFilters} background={colors.deepGreen} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 12,
        paddingBottom: 20,
        alignItems: 'center',
        height: '80%',
    },
    textLine: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 24,
        paddingLeft: 24,
        marginTop: 10,
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#194852',
    },
    scrollViewContainer: {
        flex: 1, 
        width: '100%',
        paddingBottom: 10,
        paddingLeft: 40
    },
    scrollContent: {
        paddingBottom: 20,
        width: '100%',
        alignItems: 'flex-start',
    },
    sectionTitle: {
        fontSize: 15,
        marginVertical: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 16, 
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: '100%',
    },
    icon: {
        marginHorizontal: 5,
    },
});

export default FilterModalDIYPRO;
