import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConnectionScreen from './screens/connection/ConnectionScreen';
import ProjectsScreen from './screens/projects/ProjectsScreen';
import NewProjectScreen from './screens/projects/NewProjectScreen';
import HomeScreen from './screens/home/HomeScreen';
import MyTeamScreen from './screens/team/MyTeamSceen'
import NewArtisanScreen from './screens/team/NewArtisanScreen';
import NewCoworkerScreen from './screens/team/NewCoworkerScreen';
import ConfigureExpertiseScreen from './screens/team/ConfigureExpertiseScreen';
import { MyLightTheme, MyDarkTheme } from './components/Theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProjectsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProjectsScreen" component={ProjectsScreen} />
      <Stack.Screen name="NewProjectScreen" component={NewProjectScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
        let IconComponent = FontAwesome;
        if (route.name === 'MyTeamScreen') {
          iconName = 'group';
        } else if (route.name === 'HomeScreen') {
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
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="MyTeamScreen" component={MyTeamScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer theme={MyLightTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ConnectionScreen" component={ConnectionScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="NewArtisanScreen" component={NewArtisanScreen} />
        <Stack.Screen name="NewCoworkerScreen" component={NewCoworkerScreen} />
        <Stack.Screen name="ConfigureExpertiseScreen" component={ConfigureExpertiseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
