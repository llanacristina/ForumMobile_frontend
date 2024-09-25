import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import Api from '../services/axios';
import { UserContext } from '../contexts/user';
import { storeToken } from '../services/token';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import styles from '../styles/createProfile';
import theme from '../styles/theme';

type CreateAccountRouteProp = RouteProp<RootStackParamList, 'CreateAccount'>;

// Schema de validação usando zod
const createAccountSchema = z.object({
  username: z.string().min(4, 'O nome de usuário deve ter pelo menos 4 caracteres'),
  email: z.string().email('Digite um e-mail válido'),
  password: z.string().min(9, 'A senha deve ter no mínimo 9 caracteres'),
  confirmPassword: z.string().min(9, 'Confirme sua senha'),
  location: z.string().min(1,'A localização é obrigatória'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

const CreateAccountScreen = ({ navigation }: any) => {
  const userContext = useContext(UserContext);
  const route = useRoute<CreateAccountRouteProp>();

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { setUser } = userContext;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      location: '',
    },
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (route.params?.newLocation) {
      const { latitude, longitude } = route.params.newLocation;
      setValue('location', `${latitude}, ${longitude}`);
    }
  }, [route.params?.newLocation, setValue]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCreateAccount = async (data: any) => {
    const { username, email, password, location } = data;
    const [lat, lon] = location.split(',').map((coord:string) => parseFloat(coord.trim()));

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
    navigation.navigate('MapScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar uma conta</Text>
      <Text style={styles.subtitle}>Crie sua conta abaixo</Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Usuário"
                placeholderTextColor={theme.colors.text}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.username && (
                <Text style={styles.errorText}>{errors.username.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor={theme.colors.text}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.passwordContainer}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.passwordInput}
                placeholder="Senha"
                secureTextEntry={!passwordVisible}
                placeholderTextColor={theme.colors.text}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Ionicons
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                secureTextEntry={!passwordVisible}
                placeholderTextColor={theme.colors.text}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="location"
          render={({ field: { value } }) => (
            <>
              <TouchableOpacity onPress={navigateToMap} style={styles.inputWithIcon}>
                <TextInput
                  style={styles.input}
                  placeholder="Localização"
                  placeholderTextColor="#FFFFFF"
                  value={value}
                  editable={false}
                />
                <Ionicons name="map" size={24} color="#FFFFFF" style={styles.mapIcon} />
              </TouchableOpacity>
              {errors.location && (
                <Text style={styles.errorText}>{errors.location.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleCreateAccount)}>
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
