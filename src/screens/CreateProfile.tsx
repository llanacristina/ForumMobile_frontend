import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles/createProfile';
import theme from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import Api from '../services/axios';
import { UserContext } from '../contexts/user';
import { storeToken } from '../services/token';

const CreateAccountScreen = ({ navigation }: any) => {
  const userContext = useContext(UserContext);

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      console.error('As senhas não coincidem');
      return;
    }

    try {
      const response = await Api.post('/users/', {
        username,
        email,
        password,
        location,
      });
      console.log('Conta criada com sucesso:', response.data);
      
      await storeToken(response.data.token);

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
      console.error('Erro ao criar conta:', error);
    }
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
        <TextInput
          style={styles.input}
          placeholder="Localização"
          placeholderTextColor={theme.colors.text}
          onChangeText={setLocation}
          value={location}
        />
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
