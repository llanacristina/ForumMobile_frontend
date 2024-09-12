import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../contexts/user';
import Header from '../components/Header';
import styles from '../styles/profile';
import { deleteUserData, storeUserData } from '../services/userData';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/types';
import Api, { host } from '../services/axios';
import { deleteToken } from '../services/token';
import CardPost from '../components/CardPost';

const ProfileScreen = () => {
  const userContext = useContext(UserContext);
  const navigation = useNavigation<NavigationProp>();

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { user, setUser } = userContext;
  const [postsCount, setPostsCount] = useState<string>(''); 
  const [commentsCount, setCommentsCount] = useState<string>(''); 
  const [profileURL, setProfileURL] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);


  async function getProfilePic() {
    const imageUrl = `http://${host}:3000/public/custom-pfp/${user.id}.png`;

    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      if (response.ok) {
        setProfileURL(imageUrl);
      } else {
        setProfileURL(user.profileURL ? `http://${host}:3000/public/custom-pfp/${user.profileURL}` : null);
      }
    } catch (error) {
      console.error('Ocorreu um erro ao verificar a existência da imagem:', error);
    }
  }

  async function getUserPosts() {
    try {
      const response = await Api.get(`/posts/user/${user.username}`);
      const postsData = response.data;
      setPosts(postsData);
      setPostsCount(postsData.length.toString());
    } catch (error) {
      console.error('Erro ao buscar posts do usuário:', error);
    }
  }

  useEffect(() => {
    getProfilePic();
    getUserPosts();
  }, [user.id, user.username, user.profileURL]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserPosts();
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await deleteUserData();
      await deleteToken();
      console.log('Dados do usuário e token excluídos.');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('Edit');
  };

  const formatLocation = (location: any) => {
    if (typeof location === 'string') {
      return location;
    } else if (location && typeof location === 'object') {
      return (
        <View>
          <Text style={styles.locationItem}>Latitude: {location.lat}</Text>
          <Text style={styles.locationItem}>Longitude: {location.lon}</Text>
        </View>
      );
    }
    return 'Localização não definida';
  };

  return (
    <View style={styles.container}>
      <Header onLogout={handleLogout} />

      <View style={styles.profileHeader}>
        <Image
          source={{ uri: profileURL || 'http://default-placeholder-image-url.com' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.profileLocation}>{formatLocation(user.location)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.threeDotsIcon}
          onPress={handleEditProfile}
           >
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

     
         <FlatList
         data={posts}
         keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} 
         renderItem={({ item }) => <CardPost post={item} />}
         contentContainerStyle={styles.postsContainer}
         showsVerticalScrollIndicator={false}
         />
      
    </View>
  );
};

export default ProfileScreen;
