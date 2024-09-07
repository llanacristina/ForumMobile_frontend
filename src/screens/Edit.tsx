import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/types';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/edit';

const EditProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleBackPress = () => {
    navigation.navigate('Profile');
  };

  const handleSavePress = () => {
    // Função para salvar as alterações do perfil
  };

  const handleDeletePress = () => {
    // Função para deletar a conta
  };

  return (
    <View style={styles.container}>
      <Header 
        onBackPress={handleBackPress}
        showBackButton={true}
        showLogout={false}
      />

      {/* Componente de edição de foto */}
      <View style={styles.editPhotoContainer}>
        <View style={styles.vectorIcon}></View>
        <Text style={styles.editPhotoText}>Editar foto</Text>
      </View>

      {/* Input para editar o nome do usuário */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Usuário" 
          placeholderTextColor={styles.placeholderColor.color}
        />
      </View>

      {/* Input para editar o email */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="E-mail" 
          placeholderTextColor={styles.placeholderColor.color}
        />
      </View>

      {/* Input para editar a região */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Região" 
          placeholderTextColor={styles.placeholderColor.color}
        />
      </View>

      {/* Botão de salvar */}
      <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

      {/* Botão de deletar conta */}
      <TouchableOpacity onPress={handleDeletePress} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#BA0000" />
        <Text style={styles.deleteButtonText}>Deletar conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
