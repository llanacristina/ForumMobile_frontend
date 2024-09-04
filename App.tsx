import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native-paper';
import * as Font from 'expo-font';
import { View } from 'react-native';
import CreateProfile from './src/screens/CreateProfile';
import Login from './src/screens/Login';
import MainNavigator from './src/navigation/MainNavigator';
import { UserProvider } from './src/contexts/user';
import AppStartScreen from './src/screens/AppStart';
import EditScreen from './src/screens/Edit';

const Stack = createStackNavigator();

// Função para carregar fontes
const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Regular': require('@expo-google-fonts/poppins/Poppins_400Regular.ttf'),
    'Poppins-Medium': require('@expo-google-fonts/poppins/Poppins_500Medium.ttf'),
    'Poppins-Bold': require('@expo-google-fonts/poppins/Poppins_700Bold.ttf'),
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#060510' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppStart" screenOptions={{ headerShown: false}}>
      <Stack.Screen name="AppStart" component={AppStartScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="CreateAccount" component={CreateProfile} />
      <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  </UserProvider>
  );
}
