
const CreateProjectStack = () => {
    return (
        <SafeAreaView style={{flex:1}}>
        <Scroll.Navigator 
            screenOptions={{ 
            headerShown: false, 
            tabBarStyle: { borderWidth: 1, borderBottomColor: 'rgba(231, 111, 81, 0.2)', borderColor: 'transparent', backgroundColor: MyLightTheme.colors.background },
            tabBarActiveTintColor: 'rgba(231, 111, 81, 1)',
            tabBarInactiveTintColor: 'rgba(231, 111, 81, 0.2)', // Couleur des étiquettes d'onglet non sélectionnées
            tabBarIndicatorStyle: { backgroundColor: 'rgba(231, 111, 81, 1)', height: 2 }, // Pour ne pas afficher l'indicateur
            }}
        > 
            <Scroll.Screen options={{ tabBarLabel: '1' }} name="WhereToStartScreen" component={WhereToStartScreen} />
            <Scroll.Screen options={{ tabBarLabel: '2' }} name="WhichArtisanScreen" component={WhichArtisanScreen} />
            <Scroll.Screen options={{ tabBarLabel: '3' }} name="DiyOrProScreen" component={DiyOrProScreen} />
            <Scroll.Screen options={{ tabBarLabel: '4' }} name="PlanningScreen" component={PlanningScreen} />
        </Scroll.Navigator>
        </SafeAreaView>
    );
  };