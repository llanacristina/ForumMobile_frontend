import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import styles from '../styles/home';
import modalStyles from '../styles/modal';
import Header from '../components/Header';

const posts = [
  // Dados fictícios para os posts
  { id: '1', user: 'Usuario1', content: 'Postagem 1' },
  { id: '2', user: 'Usuario2', content: 'Postagem 2' },
];

const HomeScreen = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleLogout = () => {
    // Lógica para sair da conta
  };

  const handlePost = () => {
    // Lógica para criar um novo post
  };

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postUser}>{item.user}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
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
