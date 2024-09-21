import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Api from '../services/axios';
import Header from '../components/Header';
import { NavigationProp } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import CardPost from '../components/CardPost';
import UserCard from '../components/CardUser';
import { Post, User } from '../types/object';
import styles from '../styles/search';
import { UserContext } from '../contexts/user';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState<string>('Todos');
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const userContext = useContext(UserContext);

  const navigation = useNavigation<NavigationProp>();

  if (!userContext) {
    return <Text>Carregando...</Text>;
  }
  const { user } = userContext;

  // Função para buscar todas as postagens
  const fetchPosts = async () => {
    try {
      const response = await Api.get('/filterPosts', {
        params: {
          filter: searchText,
          tab: selectedTab,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
    }
  };

  // Função para buscar postagens de um usuário específico
  const fetchUserPosts = async () => {
    try {
      if (user) {
        const response = await Api.get(`/posts/user/${user.username}`);
        const postsData = response.data;
        setPosts(response.data);

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
      }
    } catch (error) {
      console.error('Erro ao buscar postagens do usuário:', error);
    }
  };

  // Função para buscar todos os usuários
  const fetchUsers = async () => {
    try {
      const response = await Api.get('/filterUsers', {
        params: {
          filter: searchText,
          tab: 'Pessoas',
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Função para filtrar usuários pelo nome de usuário
  const searchUsersByUsername = async (username: string) => {
    try {
      const response = await Api.get(`/filterUsers/${username}`);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários por nome:', error);
    }
  };

  // Função para filtrar postagens pelo texto
  const searchPostsByText = async (text: string) => {
    try {
      const response = await Api.get(`/filterPosts/${text}`);
      setFilteredPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar postagens por texto:', error);
    }
  };

  // useEffect para buscar dados iniciais ou quando a aba selecionada muda
  useEffect(() => {
    if (selectedTab === 'Postagens' && user) {
      fetchUserPosts();
    } else if (selectedTab === 'Todos' || selectedTab === 'Postagens') {
      fetchPosts();
    }
    if (selectedTab === 'Pessoas') {
      fetchUsers();
    }
  }, [selectedTab, user]);

  // useEffect para filtrar usuários quando o texto de busca ou aba muda
  useEffect(() => {
    if (selectedTab === 'Pessoas' && searchText) {
      searchUsersByUsername(searchText);
    } else if (selectedTab === 'Pessoas') {
      setFilteredUsers(users);
    }
  }, [searchText, selectedTab, users]);

  // useEffect para filtrar postagens quando o texto de busca ou aba muda
  useEffect(() => {
    if (selectedTab === 'Postagens' && searchText) {
      searchPostsByText(searchText);
    } else if (selectedTab === 'Postagens') {
      setFilteredPosts(posts);
    }
  }, [searchText, selectedTab, posts]);

  // Função para manipular a busca manualmente
  const handleSearch = () => {
    if (selectedTab === 'Postagens' || selectedTab === 'Todos') {
      searchPostsByText(searchText);
    } else if (selectedTab === 'Pessoas') {
      searchUsersByUsername(searchText);
    }
  };

  // Função para voltar para a tela Home
  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Header 
        onBackPress={handleBackPress}
        showBackButton={true}
        showLogout={false}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          placeholderTextColor="#fff"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTab === 'Todos' && styles.selectedButton,
          ]}
          onPress={() => setSelectedTab('Todos')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === 'Todos' && styles.selectedButtonText,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTab === 'Pessoas' && styles.selectedButton,
          ]}
          onPress={() => setSelectedTab('Pessoas')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === 'Pessoas' && styles.selectedButtonText,
            ]}
          >
            Pessoas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTab === 'Postagens' && styles.selectedButton,
          ]}
          onPress={() => setSelectedTab('Postagens')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === 'Postagens' && styles.selectedButtonText,
            ]}
          >
            Postagens
          </Text>
        </TouchableOpacity>
      </View>
      
      {selectedTab === 'Postagens' || selectedTab === 'Todos' ? (
        <FlatList
          data={filteredPosts.length > 0 ? filteredPosts : posts}
          keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
          renderItem={({ item }) => <CardPost post={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
          renderItem={({ item }) => <UserCard user={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default SearchScreen;
