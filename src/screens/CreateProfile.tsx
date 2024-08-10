import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/createProfile';
import theme from '../styles/theme';

const CreateAccountScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar uma conta</Text>
      <Text style={styles.subtitle}>Crie sua conta abaixo</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          secureTextEntry={!passwordVisible}
          placeholderTextColor={theme.colors.placeholder}
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
          secureTextEntry
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>

      <View style={styles.locationInputContainer}>
        <TextInput
          style={styles.locationInput}
          placeholder="Selecione sua localização"
          placeholderTextColor={theme.colors.placeholder}
        />
        <Ionicons
          name="location-outline"
          size={24}
          color="#FFFFFF" 
          style={styles.locationIcon}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccountScreen;
