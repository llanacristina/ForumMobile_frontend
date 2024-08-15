import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles/login';
import theme from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import Api from '../services/axios';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigateToCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  const handleLogin = async () => {
    try {
      const response = await Api.post('/users/login', { email, password });
      console.log('Login bem-sucedido:', response.data);
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
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          onChangeText={text => setPassword(text)}
          secureTextEntry={!passwordVisible}
          placeholderTextColor={theme.colors.text}
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
          <TouchableOpacity onPress={navigateToCreateAccount}>
            <Text style={styles.linkText}>Crie sua conta</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logomarca.png')} 
          style={styles.logo}
        />
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
