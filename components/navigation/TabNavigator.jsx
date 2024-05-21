import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProjectsStack from './ProjectsStack';
import HomeStack from './HomeStack';
import TeamStack from './TeamStack';
import CreateProjectStack from './CreateProjectStack';
import { CommonActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export default function TabNavigator() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator 
        initialRouteName="HomeStack"
        screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
            let iconName = '';
            let IconComponent = FontAwesome;
            if (route.name === 'TeamStack') {
            iconName = 'group';
            } else if (route.name === 'HomeStack') {
            iconName = 'home';
            } else if (route.name === 'ProjectsStack') {
            IconComponent = Ionicons;
            iconName = 'library';
            }
            return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#194852',
        tabBarInactiveTintColor: '#b2b2b2',
        headerShown: false,
        })}>
        <Tab.Screen name="ProjectsStack" component={ProjectsStack} />
        <Tab.Screen 
            name="HomeStack" 
            component={HomeStack} 
            //problème la 1ère fois qu'on est sur HomeScreen : stack navigate quan don clique sur HomeStack
            listeners={({ navigation, route }) => ({
                tabPress: () => {
                    if (route.state && route.state.index === 0) {
                        // Already on HomeScreen, no need to reset
                        return;
                    }
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'HomeScreen' }],
                        })
                    );
                },
            })}
        />
        <Tab.Screen name="TeamStack" component={TeamStack} />
        <Tab.Screen
            name="CreateProjectStack"
            component={CreateProjectStack}
            options={{
            tabBarButton: () => null,
            tabBarVisible: false,  // Option pour cacher l'onglet
            }}
        />
        </Tab.Navigator>
    );
};