import { StyleSheet, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamScreen from '../../screens/team/TeamScreen';
import NewArtisanScreen from '../../screens/team/NewArtisanScreen';
import NewCoworkerScreen from '../../screens/team/NewCoworkerScreen';
import ConfigureExpertiseScreen from '../../screens/team/ConfigureExpertiseScreen';
import { MyLightTheme, MyDarkTheme } from '../Theme';
import TeammateSkillsScreen from '../../screens/team/TeammateSkillsScreen';

export default function ProjectsStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TeamScreen" component={TeamScreen} />
            <Stack.Screen name="NewArtisanScreen" component={NewArtisanScreen} />
            <Stack.Screen name="NewCoworkerScreen" component={NewCoworkerScreen} />
            <Stack.Screen name="ConfigureExpertiseScreen" component={ConfigureExpertiseScreen} />
            <Stack.Screen name="TeammateSkillsScreen" component={TeammateSkillsScreen} />
        </Stack.Navigator>
    );
};