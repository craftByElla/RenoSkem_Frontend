import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'

function HomeScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <Text>Home</Text>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})