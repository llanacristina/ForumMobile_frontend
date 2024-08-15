import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/createProfile';
import theme from '../styles/theme';
import Api from '../services/axios';

const CreateAccountScreen = () => {
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
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.locationInputContainer}>
        <TextInput
          style={styles.locationInput}
          placeholder="Selecione sua localização"
          placeholderTextColor={theme.colors.text}
          onChangeText={setLocation}
          value={location}
        />
        <Ionicons
          name="location-outline"
          size={24}
          color="#FFFFFF"
          style={styles.locationIcon}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logomarca.png')}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

export default CreateAccountScreen;
