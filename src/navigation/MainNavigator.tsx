import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import ProfileScreen from '../screens/Profile';
import theme from '../styles/theme'; // Importando o tema

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size = 24 }) => {
          let iconName: 'home-outline' | 'search-outline' | 'person-outline' = 'home-outline';

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary, // Cor do ícone ativo
        tabBarInactiveTintColor: theme.colors.defaultColor, // Cor do ícone inativo usando tema
        tabBarStyle: { 
          backgroundColor: theme.colors.menu, // Cor do fundo da barra
          borderTopWidth: 0, // Removendo a borda superior
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
