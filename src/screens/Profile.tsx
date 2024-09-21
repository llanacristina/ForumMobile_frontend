import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../contexts/user';
import Header from '../components/Header';
import styles from '../styles/profile';
import { deleteUserData, storeUserData } from '../services/userData';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, Post } from '../types/types';
import Api, { host } from '../services/axios';
import { deleteToken } from '../services/token';
import CardPost from '../components/CardPost';
import { PostContext } from '../contexts/post';

const ProfileScreen = () => {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const navigation = useNavigation<NavigationProp>();

  if (!userContext || !postContext) {
    return <Text>Carregando...</Text>;
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

      const commentsResponse = await Api.get('/comments/');
      const commentsData = commentsResponse.data;

      const commentsCount = commentsData.reduce((acc: any, comment: any) => {
        acc[comment.postId] = (acc[comment.postId] || 0) + 1;
        return acc;
      }, {});

      const postsWithCommentsCount = postsData.map((post: Post) => ({
        ...post,
        commentsCount: commentsCount[post._id] || 0,
      }));

      setPosts(postsWithCommentsCount);

    const totalCommentsCount = postsWithCommentsCount.reduce((acc: any, post: any) => acc + (post.commentsCount || 0), 0);
    setCommentsCount(totalCommentsCount.toString());

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
      getProfilePic();
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
    navigation.navigate('Edit', {profileURL});
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

 const handleCardPress = (post: any) => {
  postContext.setSelectedPost(post);
  navigation.navigate('AddCommentScreen', { postId: post.id });
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
         renderItem={({ item }) => 
         <CardPost post={item} 
         showComments={true}
         showDate={true}
         onPress={() => handleCardPress(item)} 
         />}
         contentContainerStyle={styles.postsContainer}
         showsVerticalScrollIndicator={false}
         />
      
    </View>
  );
};

export default ProfileScreen;
