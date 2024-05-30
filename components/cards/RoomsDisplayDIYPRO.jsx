import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MyLightTheme } from '../../components/Theme'; // Importation du thème personnalisé

const RoomIcon = ({ type }) => {
    const icons = {
        "Balcon": "🌇",
        "Buanderie": "🧺",
        "Bureau": "👨‍💻",
        "Cave": "🍷",
        "Chambre": "🛏️",
        "Cuisine": "🍳",
        "Entrée": "🚪",
        "Garage": "🚗",
        "Grenier/Combles": "🕸️",
        "Jardin": "🌳",
        "Salle à manger": "🍽️",
        "Salle de bain": "🚿"
    };

    return (
        <View style={styles.iconContainer}>
            <Text style={styles.icon}>{icons[type]}</Text>
        </View>
    );
};

const getBorderColor = (room) => {
    const { grey, lightGreen } = MyLightTheme.colors;

    let hasArtisanOrTeammates = false;

    if (Array.isArray(room.items)) {
        room.items.forEach(item => {
            if (item.artisan !== null || (Array.isArray(item.teammates) && item.teammates.length > 0)) {
                hasArtisanOrTeammates = true;
            }
        });
    }

    if (hasArtisanOrTeammates) {
        return lightGreen;
    } else {
        return grey;
    }
};

const RoomsDisplayDIYPRO = ({ rooms, onRoomPress }) => {
    const [tooltip, setTooltip] = useState({ visible: false, type: '' });
    const [tooltipGrenier, setTooltipGrenier] = useState({ visible: false });

    const sortedRooms = [...rooms].sort((a, b) => {
        const priority = [
            "Garage",
            "Cave",
            "Buanderie",
            "Jardin",
            "Cuisine",
            "Salle à manger",
            "Salon",
            "Salle de bain",
            "Bureau",
            "Balcon",
            "Chambre",
            "Chambre",
            "Grenier/Combles"
        ];
        return priority.indexOf(a.type) - priority.indexOf(b.type);
    });

    const grid = [[], [], []];
    let rowIndex = 2;
    let colIndex = 0;

    sortedRooms.forEach(room => {
        if (room.type === "Grenier/Combles") return;

        if (!grid[rowIndex]) {
            grid[rowIndex] = [];
        }

        if (colIndex === 5) {
            colIndex = 0;
            rowIndex--;

            if (!grid[rowIndex]) {
                grid[rowIndex] = [];
            }
        }

        grid[rowIndex][colIndex] = room;
        colIndex++;
    });

    const hasGrenier = sortedRooms.some(room => room.type === "Grenier/Combles");
    const grenierRoom = sortedRooms.find(room => room.type === "Grenier/Combles");

    const handleLongPress = (type) => {
        setTooltip({ visible: true, type });
    };

    const handlePressOut = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    const handleLongPressGrenier = () => {
        setTooltipGrenier({ visible: true });
    };

    const handlePressOutGrenier = () => {
        setTooltipGrenier({ visible: false });
    };

    const columnCount = Math.max(...grid.map(row => row.length));
    const triangleWidth = columnCount * 44 + (columnCount - 1) * 2;

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.roofContainer, { width: hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth }]} 
                onPress={() => hasGrenier && onRoomPress(grenierRoom._id)}
                onLongPress={handleLongPressGrenier}
                onPressOut={handlePressOutGrenier}
                disabled={!hasGrenier}
            >
                <Svg width={hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth} height="37" viewBox={`0 0 ${hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth} 37`} fill="none">
                    <Path d={`M${(hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth) / 2} 0.854419C${(hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth) / 2 + 0.4051} 0.663417 ${(hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth) / 2 + 0.8743} 0.663417 ${(hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth) / 2 + 1.2794} 0.854418L${(hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth) - 2.3494} 33.3932C${(hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth) - 0.901} 34.0763 ${(hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth) - 1.3874} 36.25 ${(hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth) - 2.9891} 36.25H2.98907C1.38741 36.25 0.900654 34.0763 2.34938 33.3933L${(hasGrenier && grid.flat().length === 0 ? 44 : triangleWidth) / 2} 0.854419Z`} fill="white" stroke={grenierRoom ? getBorderColor(grenierRoom) : MyLightTheme.colors.grey} strokeWidth="1.5" />
                </Svg>
                {hasGrenier && <Text style={styles.iconInRoof}>🕸️</Text>}
            </TouchableOpacity>

            {grid.map((row, rowIndex) => (
                <View style={styles.row} key={rowIndex}>
                    {row.map((room, colIndex) => {
                        if (!room) {
                            // console.log("Room is undefined at row:", rowIndex, "col:", colIndex);
                            return null;
                        }
                        // Initialiser les propriétés par défaut si elles sont undefined
                        room.name = room.name || '';
                        room.surface = room.surface || 0;
                        room.comment = room.comment || '';
                        room.items = room.items || [];

                        // console.log("Room data before getting border color:", room);
                        return (
                            <TouchableOpacity 
                                key={colIndex} 
                                style={[styles.room, { borderColor: getBorderColor(room) }]} 
                                onPress={() => onRoomPress(room._id)} 
                                onLongPress={() => handleLongPress(room.type)} 
                                onPressOut={handlePressOut}
                            >
                                <RoomIcon type={room.type} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}

            {tooltip.visible && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>{tooltip.type}</Text>
                </View>
            )}

            {tooltipGrenier.visible && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>Grenier/Combles</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    roofContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
    },
    row: {
        flexDirection: 'row',
    },
    room: {
        width: 44,
        height: 44,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: MyLightTheme.colors.grey,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
    },
    iconContainer: {
        alignItems: 'center',
    },
    icon: {
        fontSize: 30,
    },
    iconInRoof: {
        fontSize: 30,
        position: 'absolute',
    },
    tooltip: {
        position: 'absolute',
        top: -20, 
        left: -35,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 5,
        borderRadius: 5,
    },
    tooltipText: {
        color: '#FFF',
        fontSize: 12,
    },
});

export default RoomsDisplayDIYPRO;
