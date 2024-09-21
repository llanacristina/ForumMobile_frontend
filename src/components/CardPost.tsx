import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/cardPost';
import { host } from '../services/axios';
import { Post } from '../types/object';

type CardPostProps = {
  post: Post;
  showComments?: boolean;
  showDate?: boolean;
  onPress?: () => void; 
};

const CardPost: React.FC<CardPostProps> = ({ post, showComments = true, showDate = true, onPress }) => {
  const [profileURL, setProfileURL] = useState<string | null>(null);

  async function getProfilePic() {
    if (!post.user || !post.user.userID)  {
      setProfileURL(null);
      return;
    }

    const imageUrl = `http://${host}:3000/public/custom-pfp/${post.user.userID}.png?t=${new Date().getTime()}`;
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      if (response.ok) {
        setProfileURL(imageUrl);
      } else {
        setProfileURL(post.user.profileURL ? `http://${host}:3000/public/custom-pfp/${post.user.profileURL}` : null);
      }
    } catch (error) {
      console.error('Ocorreu um erro ao verificar a existência da imagem:', error);
      setProfileURL(post.user.profileURL ? `http://${host}:3000/public/custom-pfp/${post.user.profileURL}` : null);
    }
  }

  useEffect(() => {
    getProfilePic();
  }, [post.user?.userID, post.user?.profileURL]);

  if (!post.user) {
    return <Text>Carregando...</Text>;
  }

  return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={onPress} 
    >
      <View style={styles.header}>
        <View style={styles.userProfileContainer}>
          <Text style={styles.username}>{post.user.name}</Text>
          {profileURL ? (
            <Image source={{ uri: profileURL }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImage} />
          )}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.content}</Text>
      </View>

      <View style={styles.footer}>
        {showComments && (
          <Text style={styles.comments}>{`${post.commentsCount || 0} Comentários`}</Text>
        )}
        {showDate && (
          <Text style={styles.date}>{new Date(post.date).toLocaleDateString()}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CardPost;
