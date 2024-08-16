import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../contexts/user';
import Header from '../components/Header';
import styles from '../styles/profile';

const ProfileScreen = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { user, setUser } = userContext;
  const [postsCount, setPostsCount] = useState(''); 
  const [commentsCount, setCommentsCount] = useState(''); 

  // Função para fazer upload de imagem
  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da sua permissão para acessar as fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newProfileURL = result.assets[0].uri; 
      setUser({ ...user, profileURL: newProfileURL });
    }
  };

  function handleLogout() {
    // Adicione sua lógica de logout aqui
  }

  return (
    <View style={styles.container}>
      <Header onLogout={handleLogout} />

      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleImageUpload}>
          <Image
            source={{ uri: user.profileURL || 'https://example.com/default-profile.png' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.username}</Text>
          <Text style={styles.profileLocation}>{user.location || 'Localização não definida'}</Text>
        </View>
        <TouchableOpacity style={styles.threeDotsIcon}>
          <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{postsCount}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{commentsCount}</Text>
          <Text style={styles.statLabel}>Comentários</Text>
        </View>
      </View>

      {/* Aqui você pode adicionar outras seções como posts, comentários, etc. */}
    </View>
  );
};

export default ProfileScreen;
