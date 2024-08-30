import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import styles from '../styles/search'; 
import theme from '../styles/theme';
import Api from '../services/axios'; 

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (query?: string) => {
    setLoading(true);
    try {
      const response = await Api.get(query ? `/filterPosts/${query}` : '/filterPosts/');
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPosts(searchText);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.postItem}>
      <Text style={styles.postText}>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.frame7}>
        <Image
          source={require('../assets/logo.png')} // Certifique-se de que o caminho está correto
          style={styles.logo}
        />
      </View>
      <View style={styles.frame8}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor={theme.colors.text}
          onChangeText={setSearchText}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.postList}
        />
      )}
    </ScrollView>
  );
};

export default SearchScreen;
