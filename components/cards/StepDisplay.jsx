import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';

const StepDisplay = ({ data, onCheck, checkedItems }) => {
    const { colors } = useTheme();

    return (
        <View>
            {data.map(step => {
                const allChecked = step.items.every(item => checkedItems.includes(item.id));

                return (
                    <View
                        key={step.step}
                        style={[
                            styles.stepContainer,
                            {
                                backgroundColor: allChecked ? 'rgba(41, 157, 142, 0.2)' : colors.notification,
                            },
                        ]}
                    >
                        <Text style={[styles.stepTitle, { color: colors.deepGreen }]}>Étape {step.step}</Text>
                        {step.items.map(item => (
                            <View key={item.id} style={styles.itemContainer}>
                                <TouchableOpacity
                                    style={[styles.itemCard, { backgroundColor: colors.modalBackgroundColor }]}
                                    onPress={() => onCheck(item.id)}
                                >
                                    <Text>{item.field} - {item.name || item.type}</Text>
                                    {item.teammates.length > 0 && (
                                        <View style={[styles.teammatesContainer, { borderColor: colors.lightGreen }]}>
                                            <Text>{item.teammates.join(', ')}</Text>
                                        </View>
                                    )}
                                    {item.artisan && (
                                        <View style={[styles.teammatesContainer, { borderColor: colors.lightGreen }]}>
                                            <Text>{item.artisan}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <FontAwesome
                                    name={checkedItems.includes(item.id) ? 'dot-circle-o' : 'circle-o'}
                                    size={24}
                                    color={checkedItems.includes(item.id) ? colors.lightGreen : colors.deepGreen}
                                    style={styles.checkIcon}
                                    onPress={() => onCheck(item.id)}
                                />
                            </View>
                        ))}
                    </View>
                );
            })}
        </View>
    );
};

StepDisplay.propTypes = {
    data: PropTypes.array.isRequired,
    onCheck: PropTypes.func.isRequired,
    checkedItems: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
    stepContainer: {
        paddingHorizontal: 16,
        paddingBottom: 15,
        paddingTop: 5,
        marginVertical: 8,
        borderRadius: 16,
    },
    stepTitle: {
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 36,
        letterSpacing: 0.15,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    itemCard: {
        width: 261,
        padding: 8,
        borderRadius: 16,
        padding: 10,
    },
    checkIcon: {
        marginLeft: 10,
    },
    teammatesContainer: {
        marginTop: 4,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
});

export default StepDisplay;
