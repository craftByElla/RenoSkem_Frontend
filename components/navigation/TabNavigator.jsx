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
            if (route.name === "Main-d'œuvre") {
            iconName = 'group';
            } else if (route.name === 'Accueil') {
            iconName = 'home';
            } else if (route.name === 'Projets') {
            IconComponent = Ionicons;
            iconName = 'library';
            }
            return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#194852',
        tabBarInactiveTintColor: '#b2b2b2',
        headerShown: false,
        })}>
        <Tab.Screen name="Projets" component={ProjectsStack} />
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Main-d'œuvre" component={TeamStack} />
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