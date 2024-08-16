import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/header'; 

interface HeaderProps {
  onLogout?: () => void;
  showLogout?: boolean; // Controle se o ícone de logout deve ser mostrado
}

const Header: React.FC<HeaderProps> = ({ onLogout, showLogout = true }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      {showLogout && onLogout && (
        <TouchableOpacity onPress={onLogout}>
          <Ionicons name="log-out-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
