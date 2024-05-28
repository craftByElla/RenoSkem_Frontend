import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import PlainButton from '../../components/buttons/PlainButton';
import FilledButton from '../../components/buttons/FilledButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FilterModal = ({ isVisible, onClose, onApplyFilters, roomTypes, workTypes }) => {
    const { colors } = useTheme();
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);

    const toggleRoomType = (type) => {
        setSelectedRoomTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const toggleWorkType = (type) => {
        setSelectedWorkTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const handleApplyFilters = () => {
        onApplyFilters({ roomTypes: selectedRoomTypes, workTypes: selectedWorkTypes });
    };

    const handleResetFilters = () => {
        setSelectedRoomTypes([]);
        setSelectedWorkTypes([]);
    };

    const renderCheckbox = (label, selected, onPress) => (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
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
            <Pressable style={styles.modalOverlay} onPress={onClose}>
                <View style={[styles.modalContainer, { backgroundColor: colors.modalBackgroundColor }]}>
                    <View style={styles.textLine}>
                        <Text style={styles.text}>Filtrer les Pièces</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Entypo name="cross" size={40} color={"#6F797B"} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.sectionTitle}>Type de Pièce</Text>
                        {roomTypes.map((type) =>
                            renderCheckbox(type, selectedRoomTypes.includes(type), () => toggleRoomType(type))
                        )}
                        <Text style={styles.sectionTitle}>Type de Travaux</Text>
                        {workTypes.map((type) =>
                            renderCheckbox(type, selectedWorkTypes.includes(type), () => toggleWorkType(type))
                        )}
                    </ScrollView>
                    <View style={styles.footer}>
                        <PlainButton text="Réinitialiser" onPress={handleResetFilters} />
                        <FilledButton text="Appliquer" onPress={handleApplyFilters} background={colors.deepGreen} />
                    </View>
                </View>
            </Pressable>
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
    },
    textLine: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 24,
        paddingLeft: 24,
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#194852',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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

export default FilterModal;
