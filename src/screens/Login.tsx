import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles/login';
import theme from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import Api from '../services/axios';
import { UserContext } from '../contexts/user';

const LoginScreen = ({ navigation }: any) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { setUser } = userContext;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    try {
      const response = await Api.post('/users/login', { email, password });
      console.log('Login bem-sucedido:', response.data);
      setUser({
        token: response.data.token,
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        profileURL: response.data.profileURL,
        location: response.data.location || '', // Definindo como string vazia por padrão
      });
      navigation.navigate('Main', { screen: 'HomeScreen' });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Entrar na conta</Text>
      <Text style={styles.subtitle}>Entre na sua conta</Text>

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
            color={theme.colors.text}
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
