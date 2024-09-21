import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import Header from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp } from '../types/types';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/edit';
import { UserContext } from '../contexts/user';
import Api from '../services/axios';
import { deleteUserData, storeUserData } from '../services/userData';
import { deleteToken } from '../services/token';

const EditProfileScreen = () => {
  const userContext = useContext(UserContext);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  
  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { user, setUser, setPosts } = userContext;
  const { profileURL } = route.params as { profileURL: string | null };

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location || '');
  const [profileImage, setProfileImage] = useState<string | null>(user.profileURL || null);

  const handleBackPress = () => {
    navigation.navigate('Profile');
  };

const fetchUserPosts = async (username: string) => {
  try {
    const response = await Api.get(`/posts/user/${user.username}`);
    if (response.status === 200) {
      setPosts(response.data); 
    }
  } catch (error) {
    console.error('Erro ao carregar posts:', error);
  }
};

  const handleSavePress = async () => {
    try {
      const updatedUser = {
        username,
        email,
        location,
      };

      const response = await Api.post(`users/edit/${user.id}`, updatedUser);

      if (response.status === 200) {
        const newUser = { ...user, ...updatedUser };
        setUser(newUser);
        await storeUserData(newUser);

        await fetchUserPosts(newUser.username); 

        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        navigation.navigate('Profile');
      } else {
        console.error('Erro ao atualizar o perfil:', Error);
        Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Você precisa permitir o acesso à galeria para alterar a foto de perfil.',
        [{ text: 'OK' }]
      );
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (result.canceled) {
      Alert.alert('Cancelado', 'Seleção de imagem foi cancelada.');
      return;
    }
  
    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
  
      const formData = new FormData();
      formData.append('pf-picture', {
        uri: selectedImage,
        type: 'image/png',  
        name: `${user.id}.png`,
      } as any);
  
      try {
        const response = await Api.post(`/users/profilePicture/${user.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
        const updatedUser = { ...user, profileURL: selectedImage };
        setUser(updatedUser);
        await storeUserData(updatedUser); 

          setProfileImage(selectedImage);
          Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!');
        }
      } catch (error) {
        console.error('Erro ao atualizar a foto de perfil:', error);
        Alert.alert('Erro', 'Não foi possível atualizar a foto de perfil.');
      }
    }
  };
  
  const handleDeletePress = async () => {
    try {
      const confirmed = await new Promise<boolean>((resolve) => {
        Alert.alert(
          'Confirmação',
          'Você tem certeza de que deseja excluir sua conta? Esta ação é irreversível.',
          [
            { text: 'Cancelar', onPress: () => resolve(false), style: 'cancel' },
            { text: 'Excluir', onPress: () => resolve(true) },
          ]
        );
      });
  
      if (!confirmed) return;

      await Api.get(`/posts/delete/${user.id}`); 

       await Api.get(`/users/delete/${user.id}`); 

      await deleteUserData();
      await deleteToken();
 
        navigation.navigate('Login');
  
        Alert.alert('Sucesso', 'Sua conta foi excluída com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir sua conta. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        onBackPress={handleBackPress}
        showBackButton={true}
        showLogout={false}
      />

      <View style={styles.editPhotoContainer}>
        <TouchableOpacity onPress={handleImageUpload} style={{ position: 'relative' }}>
          <Image
            source={{ uri: profileURL || 'http://default-placeholder-image-url.com' }}
            style={styles.profileImage}
          />
          <Ionicons name="pencil" size={24} color="#FFFFFF" style={styles.editIcon} />
        </TouchableOpacity>
        <Text style={styles.editPhotoText}>Editar foto</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={username}
          onChangeText={setUsername}
          placeholder="Usuário"
          placeholderTextColor={styles.placeholderColor.color} 
        />
        <TextInput 
          style={styles.input} 
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={styles.placeholderColor.color}
        />
      </View>

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSavePress}
      >
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={handleDeletePress}
      >
        <Ionicons name="trash-outline" size={20} color="#BA0000" />
        <Text style={styles.deleteButtonText}>Deletar Conta</Text>
      </TouchableOpacity> 
    </View>
  );
};

export default EditProfileScreen;
