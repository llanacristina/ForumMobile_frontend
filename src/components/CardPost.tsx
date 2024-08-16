import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/cardPost';

interface CardPostProps {
  id: string;
  profileImage: string;
  username: string;
  content: string;
  commentsCount: number;
  datePosted: string;
}

const CardPost: React.FC<CardPostProps> = ({
  id,
  profileImage,
  username,
  content,
  commentsCount,
  datePosted,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.datePosted}>{datePosted}</Text>
        </View>
      </View>

      <Text style={styles.content}>{content}</Text>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.commentsButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          <Text style={styles.commentsText}>{commentsCount} Comentários</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardPost;
