import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles/createProfile';
import theme from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import Api from '../services/axios';
import { UserContext } from '../contexts/user';
import { storeToken } from '../services/token';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

type CreateAccountRouteProp = RouteProp<RootStackParamList, 'CreateAccount'>;

const CreateAccountScreen = ({ navigation }: any) => {
  const userContext = useContext(UserContext);
  const route = useRoute<CreateAccountRouteProp>();

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { setUser } = userContext;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

   useEffect(() => {
    if (route.params?.newLocation) {
      const { latitude, longitude } = route.params.newLocation;
      setLocation(`${latitude}, ${longitude}`);
    }
  }, [route.params?.newLocation]);
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      console.error('As senhas não coincidem');
      return;
    }

    const [lat, lon] = location.split(',').map(coord => coord.trim());
    try {
      const userResponse = await Api.post('/users/', {
        username,
        email,
        password,
        location: { lat, lon }, 
      });
      console.log('Conta criada com sucesso:', userResponse.data);
      
      await storeToken(userResponse.data.token);

      setUser({
        token: userResponse.data.token,
        id: userResponse.data.id,
        username: userResponse.data.username,
        email: userResponse.data.email,
        profileURL: userResponse.data.profileURL,
        location: userResponse.data.location || '',
      });

      await Api.post('/localizations/', {
      lon: route.params?.newLocation?.longitude, 
      lat: route.params?.newLocation?.latitude,
      userID: userResponse.data.id, 
    });

      navigation.navigate('Main', { screen: 'HomeScreen' });
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  };

  const navigateToMap = () => {
    navigation.navigate('MapScreen')
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar uma conta</Text>
      <Text style={styles.subtitle}>Crie sua conta abaixo</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor={theme.colors.text}
          onChangeText={setUsername}
          value={username}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={theme.colors.text}
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          secureTextEntry={!passwordVisible}
          placeholderTextColor={theme.colors.text}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={!passwordVisible}
          placeholderTextColor={theme.colors.text}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={navigateToMap} style={styles.inputWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="Localização"
            placeholderTextColor="#FFFFFF"
            value={location}
            editable={false} 
          />
          <Ionicons name="map" size={24} color="#FFFFFF" style={styles.mapIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logomarca.png')}
          style={styles.logo}
        />
      </View>
    </ScrollView>
  );
};

export default CreateAccountScreen;
