import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import ProfileScreen from '../screens/Profile';
import EditScreen from '../screens/Edit'; // Importando a tela Edit
import CreateProfileScreen from '../screens/CreateProfile'; // Importando a tela CreateProfile
import theme from '../styles/theme';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: 'home-outline' | 'search-outline' | 'person-outline' | 'settings-outline' | 'person-add-outline' = 'home-outline';

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else if (route.name === 'Edit') {
            iconName = 'settings-outline'; // Alternativo para "edit"
          } else if (route.name === 'CreateProfile') {
            iconName = 'person-add-outline'; // Alternativo para "create"
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'white',
        tabBarStyle: { 
          backgroundColor: theme.colors.menu,
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Edit" component={EditScreen} options={{ headerShown: false }} />
      <Tab.Screen name="CreateProfile" component={CreateProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
