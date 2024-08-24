import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { retrieveUserData } from '../services/userData'; 

const AppStartScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await retrieveUserData();
      if (userData && userData.token) {
        // Se os dados do usuário estiverem presentes e o token for válido, redirecionar para HomeScreen
        navigation.navigate('Main', { screen: 'HomeScreen' });
      } else {
        // Se o usuário não estiver logado, redirecionar para LoginScreen
        navigation.navigate('Login');
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    </View>
  );
};

export default AppStartScreen;
