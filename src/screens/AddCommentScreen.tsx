import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/addComment';
import Header from '../components/Header';

const AddCommentScreen = ({ route }: any) => {
  const { post } = route.params; // Recebemos a postagem da rota anterior
  const [comment, setComment] = useState('');

  const handleCommentSubmit = () => {
    if (comment) {
      // Função para enviar o comentário
      console.log('Comentário enviado:', comment);
      setComment('');
    }
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} /> {/* Com o botão de voltar */}
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Foto e nome do usuário */}
        <View style={styles.userInfoContainer}>
          <View style={styles.profilePic} />
          <Text style={styles.username}>{post.user.name}</Text>
        </View>

        {/* Conteúdo da postagem */}
        <View style={styles.postContentContainer}>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>

        {/* Comentários já existentes */}
        {post.comments.map((comment: any, index: number) => (
          <View key={index} style={styles.commentContainer}>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        ))}

        {/* Contagem de comentários e data */}
        <View style={styles.footerContainer}>
          <Text style={styles.commentCount}>{post.comments.length} comentários</Text>
          <Text style={styles.postDate}>Postado em {new Date(post.date).toLocaleDateString()}</Text>
        </View>

        {/* Input para adicionar novo comentário */}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Escreva seu comentário..."
            placeholderTextColor="#999"
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddCommentScreen;
