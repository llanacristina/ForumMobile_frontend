import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/header'; 

interface HeaderProps {
  onLogout?: () => void;
  onBackPress?: () => void;
  showLogout?: boolean; // Controle se o ícone de logout deve ser mostrado
  showBackButton?: boolean; 
}

const Header: React.FC<HeaderProps> = ({
   onLogout,
   onBackPress,
   showLogout = true,
  showBackButton = false 
}) => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
    {showBackButton && onBackPress && (
      <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
        <Ionicons name="arrow-back-outline" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    )}
    {showLogout && onLogout && (
      <TouchableOpacity onPress={onLogout} style={styles.iconContainer}>
        <Ionicons name="log-out-outline" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    )}
  </View>
  );
};

export default Header;
