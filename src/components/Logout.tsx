import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {  deleteToken } from '../services/token';
import {deleteUserData} from  '../services/userData' 
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/types';

interface LogoutButtonProps {
  onLogoutSuccess: () => void; 
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogoutSuccess }) => {
  const navigation = useNavigation<NavigationProp>();
  
  const handleLogout = async () => {
    try {
      // Deleta os dados do usuário e token
      await deleteUserData();
      await deleteToken();

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

      if (onLogoutSuccess) {
        onLogoutSuccess();
      }
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} />
  );
};

const styles = StyleSheet.create({
  logoutButton: {}
});

export default LogoutButton;
