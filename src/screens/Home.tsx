import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Modal, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import styles from '../styles/home';
import modalStyles from '../styles/modal';
import Header from '../components/Header';
import  { Post } from '../types/object'; 
import CardPost from '../components/CardPost'
import { deleteToken } from '../services/token';
import { deleteUserData } from '../services/userData';
import { UserContext } from '../contexts/user';
import Api from '../services/axios';

const initialPosts: Post[] = [];

const HomeScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const userContext = useContext(UserContext);

  if (!userContext) {
    return <Text>Carregando...</Text>;
  }
  const { user } = userContext;


  const handleLogout = async() => {
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

  const fetchPosts = async () => {
    try {
      const response = await Api.get('/posts/');
      //console.log(response.data); // Logar para verificar a estrutura dos dados
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  };

  const handlePost = async () => {
    if (!title || !content) {
      return;
    }

    if (!user) {
      console.error('Usuário não autenticado');
      return;
    }

    try {
      const newPost = {
        title,
        content,
        user: {
          userID: user.id,
          name: user.username,
          profileURL: user.profileURL,
        },
        commentsCount: 0,
        date: new Date(),
      };

      const response = await Api.post('/posts/', newPost);
      console.log('Post criado com sucesso!');

      setPosts((prevPosts) => [response.data, ...prevPosts]);

         // Atualize os posts após a criação
      fetchPosts();

      setTitle('');
      setContent('');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Erro ao criar o post:', error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Header onLogout={handleLogout} />

      <View style={styles.newPostContainer}>
        <Text style={styles.newPostText}>O que há de novo?</Text>
        <TouchableOpacity style={styles.postButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.postButtonText}>Postar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
         data={posts}
         keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} 
         renderItem={({ item }) => <CardPost post={item} />}
         />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={modalStyles.modalOverlay}
          >
            <View style={modalStyles.modalContainer}>
              <TouchableOpacity
                style={modalStyles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={modalStyles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <TextInput
                style={modalStyles.input}
                placeholder="Título"
                placeholderTextColor="#fff"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={modalStyles.textArea}
                placeholder="Conteúdo"
                placeholderTextColor="#fff"
                value={content}
                onChangeText={setContent}
                multiline
                maxLength={500}
              />
              <TouchableOpacity style={modalStyles.createButton} onPress={handlePost}>
                <Text style={modalStyles.createButtonText}>Criar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default HomeScreen;
