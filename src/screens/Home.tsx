import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from '../styles/home';
import { Ionicons } from '@expo/vector-icons';

const posts = [
  // Dados ficticios para os posts
  { id: '1', user: 'Usuario1', content: 'Postagem 1' },
  { id: '2', user: 'Usuario2', content: 'Postagem 2' },
  // Adicione mais posts conforme necessario
];

const HomeScreen = ({ navigation }: any) => {
  const handleLogout = () => {
    // Logica para sair da conta
  };

  const handlePost = () => {
    // Logica para criar um novo post
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.newPostContainer}>
        <Text style={styles.newPostText}>O que há de novo?</Text>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Postar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postUser}>{item.user}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
