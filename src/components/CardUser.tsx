import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { User } from '../types/object';
import { host } from '../services/axios';
import styles from '../styles/CardUser';

const UserCard: React.FC<{user : User}> = ({ user }) => {
  const [profileURL, setProfileURL] = useState<string | null>(null);

  async function getProfilePic() {
    if (!user._id) {
      setProfileURL(null);
      return;
    }

    const imageUrl = `http://${host}:3000/public/custom-pfp/${user._id}.png`;
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      if (response.ok) {
        setProfileURL(imageUrl);
      } else {
        setProfileURL(user.profileURL ? `http://${host}:3000/public/custom-pfp/${user.profileURL}` : null);
      }
    } catch (error) {
      console.error('Ocorreu um erro ao verificar a existência da imagem:', error);
      setProfileURL(user.profileURL ? `http://${host}:3000/public/custom-pfp/${user.profileURL}` : null);
    }
  }

  useEffect(() => {
    getProfilePic();
  }, [user._id]);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.picture}>
          {profileURL ? (
            <Image source={{ uri: profileURL }} style={styles.image} />
          ) : (
            <View style={styles.image} /> 
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserCard;
