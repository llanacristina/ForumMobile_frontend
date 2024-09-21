import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { PostContext } from '../contexts/post';
import { UserContext } from '../contexts/user';
import Header from '../components/Header';
import styles from '../styles/addComment';
import CardPost from '../components/CardPost';
import Api from '../services/axios';
import { useNavigation } from '@react-navigation/native';
import {saveComments, loadCommentsFromStorage} from '../services/commentsAsync'; 
import {Comment} from '../types/object'
import { NavigationProp } from '../types/types';

const AddCommentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  
  if (!userContext || !postContext || !postContext.selectedPost) {
    return <Text>Carregando...</Text>;
  }
  const { user } = userContext;
  const { selectedPost, setSelectedPost } = postContext;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  if (!selectedPost) {
    return <Text>Post não encontrado.</Text>;
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await Api.get('/comments/'); 
        const allComments = response.data;

        const filteredComments = allComments.filter((c: any) => c.postId === selectedPost._id);
        //console.log('Comentários carregados:', filteredComments);
        setComments(filteredComments);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      }
    };
    fetchComments();
  }, [selectedPost]);

  const handleCommentSubmit = async () => {
    if (comment && user && selectedPost) {
      const newComment = {
        user: {
          name: user.username,
          profileURL: user.profileURL,
          userID: user.id,
        },
        postId: selectedPost._id,
        content: comment,
      };
  
      try {
        const response = await Api.post('/comments/', newComment);
        const createdComment = response.data.comment;
  
        if (createdComment && createdComment.content) {
        const updatedComments = [...comments, createdComment];
        setComments(updatedComments);

        await saveComments(selectedPost._id, updatedComments); 
        setComment('');
        } else {
          console.error('Resposta da API não contém o comentário esperado:', response.data);
        }
      } catch (error) {
        console.error('Erro ao enviar comentário:', error);
      }
    }
  };
  
  const loadComments = async () => {
    try {
      const storedComments = await loadCommentsFromStorage(selectedPost._id);
      if (storedComments.length > 0) {
        setComments(storedComments);
      } else {
        const response = await Api.get('/comments/');
        const allComments: Comment[] = response.data;
        const filteredComments = allComments.filter(c => c.postId === selectedPost._id);
        setComments(filteredComments);
        await saveComments(selectedPost._id, filteredComments);
      }
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [selectedPost]);

  
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
      
      <View style={styles.contentContainer}>
        <CardPost post={selectedPost} showComments={false} showDate={false} />
        <View style={styles.footerContainer}>
          <Text style={styles.commentCount}>{comments.length} Comentários</Text>
          <Text style={styles.postDate}>Postado em {new Date(selectedPost.date).toLocaleDateString()}</Text>
        </View>

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
        
        <FlatList
          data={comments}
          keyExtractor={(item) => item._id ? item._id : item.content} 
          renderItem={({ item }: {item: Comment}) => (
            <View style={styles.commentContainer}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentUser}>{item.user.name}</Text>
              </View>
              <Text style={styles.commentText}>{item.content}</Text>
            </View>
          )}
          contentContainerStyle={styles.commentListContainer}
          ListEmptyComponent={<Text style={styles.noCommentsText}>Nenhum comentário ainda.</Text>}
        />
      </View>
    </View>
  );
};

export default AddCommentScreen;
