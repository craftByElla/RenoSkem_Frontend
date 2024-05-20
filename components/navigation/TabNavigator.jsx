import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProjectsStack from './ProjectsStack';
import HomeStack from './HomeStack';
import TeamStack from './TeamStack';
import CreateProjectStack from './CreateProjectStack';

export default function TabNavigator() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
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
        <Tab.Screen name="HomeStack" component={HomeStack} />
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