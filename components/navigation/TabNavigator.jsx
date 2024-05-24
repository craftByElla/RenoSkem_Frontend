import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProjectsStack from './ProjectsStack';  // Importation des différents Stack Navigators pour chaque onglet
import HomeStack from './HomeStack';
import TeamStack from './TeamStack';
import CreateProjectStack from './CreateProjectStack';

export default function TabNavigator() { // Définition du composant TabNavigator
  const Tab = createBottomTabNavigator();  // Création d'un Tab Navigator
  return ( // Rendu du Tab Navigator avec les différents onglets
    <Tab.Navigator  // Options de navigation communes à tous les onglets
      screenOptions={({ route }) => ({ // Définition de l'icône de chaque onglet en fonction de son nom de route
        tabBarIcon: ({ color, size }) => {
            let iconName = '';
            let IconComponent = FontAwesome;  // Utilisation de FontAwesome par défaut
            if (route.name === "Main-d'œuvre") {
            iconName = 'group';
            } else if (route.name === 'Accueil') {
            iconName = 'home';
            } else if (route.name === 'Projets') {
            IconComponent = Ionicons;  // Utilisation de Ionicons pour l'onglet "Projets"
            iconName = "library";
          }
          return <IconComponent name={iconName} size={size} color={color} />;  // Rendu de l'icône avec le composant d'icône spécifié et les propriétés de couleur et de taille
        },
        tabBarActiveTintColor: "#194852", // Couleur de l'icône pour l'onglet actif
        tabBarInactiveTintColor: "#b2b2b2", // Couleur de l'icône pour les onglets inactifs
        headerShown: false,   // Option pour cacher l'en-tête pour tous les écrans
        })}>
        <Tab.Screen name="Projets" component={ProjectsStack} /> {/* Définition des différents onglets avec leur nom et le composant associé */}
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Main-d'œuvre" component={TeamStack} />
        <Tab.Screen  // Onglet pour créer un projet avec options spécifiques pour le cacher 
            name="CreateProjectStack"
            component={CreateProjectStack}
            options={{
            tabBarButton: () => null, // Supprime le bouton de l'onglet
            tabBarVisible: false,  // Option pour cacher l'onglet
            }}
        />
        </Tab.Navigator>
    );
};