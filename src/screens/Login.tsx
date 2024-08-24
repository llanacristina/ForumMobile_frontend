import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import theme from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import Api from '../services/axios';
import { storeUserData } from '../services/userData'; 
import { storeToken } from '../services/token';
import styles from '../styles/login';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    try {
      const response = await Api.post('/users/login', { email, password });
      const { token, user } = response.data;

      await storeToken(token);
      await storeUserData(user);
      console.log('Login bem-sucedido:', response.data);

      const userData = {
        token: response.data.token,
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        profileURL: response.data.profileURL,
        location: response.data.location || '', // Definindo como string vazia por padrão
      };
      await storeUserData(userData);

      navigation.navigate('Main', { screen: 'HomeScreen' });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Email ou senha incorretos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.subtitle}>Faça login com sua conta</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <View style={styles.accountContainer}>
          <Text style={styles.linkPrompt}>Não possui conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={styles.linkText}>Crie sua conta</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logomarca.png')}
          style={styles.logo}

        />
       
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
