import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useTheme } from '@react-navigation/native';

function FillableIcons({plainIcon, filledIcon, color, updateTrustLevel, trustLevel}) {
    const { colors } = useTheme();
    const [personalNote, setPersonalNote] = useState(0);
    const personalStars = [];
    for (let i = 0; i < 3; i++) {
    
        useEffect(()=> {
        if (trustLevel){
            setPersonalNote(trustLevel)
        }
    }, [trustLevel])
        
    let iconName = plainIcon;
    if (i < personalNote) {
        iconName = filledIcon;
    }
    personalStars.push(
            <FontAwesome 
                key={i} name={iconName} 
                onPress={() => {setPersonalNote(i + 1), updateTrustLevel(i + 1)}} 
                color={colors[color]} 
                size={24} 
            />
        );
    }
    
    

    return (
        <>
            {personalStars}
        </>
    )
}

export default FillableIcons;