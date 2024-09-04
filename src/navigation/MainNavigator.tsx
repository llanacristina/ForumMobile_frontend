import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import ProfileScreen from '../screens/Profile';
import theme from '../styles/theme';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: 'home-outline' | 'search-outline' | 'person-outline'  = 'home-outline';

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
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
    </Tab.Navigator>
  );
}
