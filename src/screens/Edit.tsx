import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/types';
import styles from '../styles/edit';


const EditProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  

  const handleBackPress = () => {
    navigation.navigate('Profile');
  };



  return (
    <View style={styles.container}>
        <Header 
        onBackPress={handleBackPress}
        showBackButton={true}
        showLogout={false}
      />


      {/* Conteúdo da tela pode ser adicionado aqui */}
    </View>
  );
};


export default EditProfileScreen;
