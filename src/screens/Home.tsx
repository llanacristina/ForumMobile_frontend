import React, { useState } from 'react';
import { View, FlatList, Modal, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import styles from '../styles/home';
import modalStyles from '../styles/modal';
import Header from '../components/Header';
import  { Post } from '../types/object'; 
import CardPost from '../components/CardPost'

//Exemplos ficticios
const posts2: Post[] = [
  {
    id: '1',
    title: 'Título do Post 1',
    content: 'Conteúdo da Postagem 1',
    date: new Date(),
    user: {
      userID: 'user1',
      name: 'Usuario1',
      profileURL: 'default-profile-url.png',
    },
  },
  {
    id: '2',
    title: 'Título do Post 2',
    content: 'Conteúdo da Postagem 2',
    date: new Date(),
    user: {
      userID: 'user2',
      name: 'Usuario2',
      profileURL: 'default-profile-url.png',
    },
  },
];

const HomeScreen = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleLogoutSuccess = () => {
    navigation.navigate('Login');
  };

  const handlePost = () => {
    // Lógica para criar um novo post
  };

  return (
    <View style={styles.container}>
      <Header onLogout={handleLogoutSuccess} />

      <View style={styles.newPostContainer}>
        <Text style={styles.newPostText}>O que há de novo?</Text>
        <TouchableOpacity style={styles.postButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.postButtonText}>Postar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts2}
        keyExtractor={(item) => item.id}
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
