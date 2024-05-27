import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MyLightTheme } from '../../components/Theme'; // Importation du thème personnalisé

// Composant RoomIcon pour afficher les icônes des pièces
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

// Composant RoomTooltip pour afficher une infobulle avec le type de pièce
const RoomTooltip = ({ type }) => (
    <View style={styles.tooltip}>
        <Text style={styles.tooltipText}>{type}</Text>
    </View>
);

// Composant principal RoomsDisplay pour afficher le plan des pièces
const RoomsDisplay = ({ rooms, onRoomPress }) => {
    // État pour gérer la visibilité et le type de l'infobulle
    const [tooltip, setTooltip] = useState({ visible: false, type: '' });
    const [tooltipGrenier, setTooltipGrenier] = useState({ visible: false });

    // Trier les pièces selon la priorité définie
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

    // Répartition des pièces dans une grille de 3 lignes
    const grid = [[], [], []]; // 3 lignes
    let rowIndex = 2; // Initialiser l'index de ligne à la dernière ligne
    let colIndex = 0; // Initialiser l'index de colonne à la première colonne

    sortedRooms.forEach(room => {
        if (room.type === "Grenier/Combles") return; // Ignorer le grenier

        // Initialiser la ligne si elle n'existe pas encore
        if (!grid[rowIndex]) {
            grid[rowIndex] = [];
        }

         //Si colIndex atteint 5 (indiquant la sixième colonne)
         //cela signifie que la ligne est complète : 
         //Il faut donc réinitialiser colIndex à 0 pour recommencer à la première colonne & Décrémenter rowIndex pour passer à la ligne précédente.
         
        if (colIndex === 5) {
            colIndex = 0; // Réinitialiser l'index de colonne à la première colonne
            rowIndex--; // Décrémenter l'index de ligne pour passer à la ligne précédente

            // Initialiser la ligne si elle n'existe pas encore
            if (!grid[rowIndex]) {
                grid[rowIndex] = [];
            }
        }
    
        grid[rowIndex][colIndex] = room; // Ajouter la pièce à la position actuelle dans la grille
        colIndex++; // Incrémenter l'index de colonne pour la prochaine pièce
    });
    

    // Vérifier si un grenier est présent parmi les pièces
    const hasGrenier = sortedRooms.some(room => room.type === "Grenier/Combles");

    // Gérer l'affichage de l'infobulle lors d'un appui long sur une pièce
    const handleLongPress = (type) => {
        setTooltip({ visible: true, type });
    };

    const handlePressOut = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    // Gérer l'affichage de l'infobulle pour le grenier
    const handleLongPressGrenier = () => {
        setTooltipGrenier({ visible: true });
    };

    const handlePressOutGrenier = () => {
        setTooltipGrenier({ visible: false });
    };

    // Calculer la largeur du triangle en fonction du nombre de colonnes
    const columnCount = Math.max(...grid.map(row => row.length));
    const triangleWidth = columnCount * 44 + (columnCount - 1) * 2;

    return (
        <View style={styles.container}>
            {/* Triangle représentant le toit */}
            <TouchableOpacity 
                style={[styles.roofContainer, { width: triangleWidth }]} 
                onPress={() => hasGrenier && console.log("Clicked on Grenier")}
                onLongPress={handleLongPressGrenier}
                onPressOut={handlePressOutGrenier}
                disabled={!hasGrenier}
            >
                <Svg width={triangleWidth} height="37" viewBox={`0 0 ${triangleWidth} 37`} fill="none">
                    <Path d={`M${triangleWidth / 2} 0.854419C${triangleWidth / 2 + 0.4051} 0.663417 ${triangleWidth / 2 + 0.8743} 0.663417 ${triangleWidth / 2 + 1.2794} 0.854418L${triangleWidth - 2.3494} 33.3932C${triangleWidth - 0.901} 34.0763 ${triangleWidth - 1.3874} 36.25 ${triangleWidth - 2.9891} 36.25H2.98907C1.38741 36.25 0.900654 34.0763 2.34938 33.3933L${triangleWidth / 2} 0.854419Z`} fill="white" stroke="#9B9B9B"/>
                </Svg>
                {hasGrenier && <Text style={styles.iconInRoof}>🕸️</Text>}
            </TouchableOpacity>
            {/* Affichage des pièces dans la grille */}
            {grid.map((row, rowIndex) => (
                <View style={styles.row} key={rowIndex}>
                    {row.map((room, colIndex) => (
                        <TouchableOpacity 
                            key={colIndex} 
                            style={styles.room} 
                            onPress={() => onRoomPress(room._id)} // Passer l'ID de la pièce à la fonction de rappel}
                            onLongPress={() => handleLongPress(room.type)} 
                            onPressOut={handlePressOut}
                        >
                            <RoomIcon type={room.type} />
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
            {/* Infobulle pour les pièces */}
            {tooltip.visible && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>{tooltip.type}</Text>
                </View>
            )}
            {/* Infobulle pour le grenier */}
            {tooltipGrenier.visible && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>Grenier/Combles</Text>
                </View>
            )}
        </View>
    );
};

// Styles pour le composant
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    roofContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2, // Espacement avec les pièces en dessous
    },
    row: {
        flexDirection: 'row',
    },
    room: {
        width: 44,
        height: 44,
        borderRadius: 8,
        borderWidth: 1,
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

export default RoomsDisplay;
