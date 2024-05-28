import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useTheme } from '@react-navigation/native';

function FillableIcons({plainIcon, filledIcon, color}) {
    // Utilisation du hook `useTheme` pour accéder aux couleurs du thème actuel
    const { colors } = useTheme();

    const [personalNote, setPersonalNote] = useState(0);
    // Tableau pour stocker les icônes à afficher
    const personalStars = [];
    // Boucle pour créer trois icônes
    for (let i = 0; i < 3; i++) {
    // Déterminer quel icône afficher (plainIcon ou filledIcon) en fonction de la note personnelle
    let iconName = plainIcon;
    if (i < personalNote) {
        iconName = filledIcon;
    }
     // Ajouter l'icône au tableau `personalStars`
    // - Utilisation de `FontAwesome` pour rendre l'icône
    // - `key` est utilisé pour donner un identifiant unique à chaque élément de la liste
    // - `name` détermine quel icône afficher
    // - `onPress` est un gestionnaire d'événements qui met à jour `personalNote` lorsque l'icône est pressée
    // - `color` définit la couleur de l'icône en utilisant les couleurs du thème
    // - `size` définit la taille de l'icône
    personalStars.push(<FontAwesome key={i} name={iconName} onPress={() => setPersonalNote(i + 1)} color={colors[color]} size={24} />);
    }

    return (
        <>
            {personalStars}
        </>
    )
}

export default FillableIcons;