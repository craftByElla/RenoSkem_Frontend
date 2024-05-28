import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

const CardRoomDetailsDIYPRO = ({ room, onPress }) => {
    const { colors } = useTheme();
    const borderColor = getBorderColor(room, colors);
    const smileys = {
        "Chauffage": "🔥",
        "Cloisonnement/Plâtrage": "📏",
        "Démolition": "💣",
        "Électricité": "⚡",
        "Étanchéité": "☔",
        "Façade": "🏢",
        "Fondations": "🏗️",
        "Installation cuisine/SDB": "🚰",
        "Isolation": "❄️",
        "Maçonnerie": "🧱",
        "Menuiserie": "🪚",
        "Montage de meuble": "🪑",
        "Peinture": "🎨",
        "Plomberie": "💧",
        "Revêtements muraux": "🖼️",
        "Revêtements sol": "🦶🏾",
        "Revêtements extérieurs": "🏡",
        "Toiture": "🛠️",
        "Ventilation": "🌬️"
    };

    return (
        <TouchableOpacity style={[styles.card, { borderColor, backgroundColor: colors.modalBackgroundColor }]} onPress={onPress}>
            <View style={styles.leftContainer}>
                <Text style={styles.title}>{room.name || room.type}</Text>
                <Text style={styles.items} numberOfLines={1} ellipsizeMode="tail">
                    {room.items.map(item => smileys[item.field]).join(' ')}
                </Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.comment} numberOfLines={5} ellipsizeMode="tail">{room.comment}</Text>
            </View>
        </TouchableOpacity>
    );
};

CardRoomDetailsDIYPRO.propTypes = {
    room: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
};

const getBorderColor = (room, colors) => {
    const { grey, orange, lightGreen } = colors;
    let hasArtisanOrTeammates = false;

    room.items.forEach(item => {
        if (item.artisan !== null || (item.teammates && item.teammates.length > 0)) {
            hasArtisanOrTeammates = true;
        }
    });

    if (hasArtisanOrTeammates) {
        return lightGreen;
    } else {
        return grey;
    }
};

const styles = StyleSheet.create({
    card: {
        width: 311,
        height: 110,
        borderWidth: 1.5,
        borderRadius: 8,
        flexDirection: 'row',
        marginBottom: 10,
        paddingVertical: 5,
    },
    leftContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    title: {
        color: '#6F797B',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 19,
        letterSpacing: 0.15,
    },
    items: {
        color: '#6F797B',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 19,
        letterSpacing: 0.15,
        marginTop: 7,
    },
    rightContainer: {
        flex: 3,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    comment: {
        color: '#6F797B',
        fontFamily: 'Inter',
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: 0.15,
    },
});

export default CardRoomDetailsDIYPRO;
