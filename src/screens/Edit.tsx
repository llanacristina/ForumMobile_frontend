import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import styles from '../styles/edit';
import theme from '../styles/theme';
import Api from '../services/axios';

const EditScreen = ({ route, navigation }: any) => {
  const { userId } = route.params; // Supondo que você passe o ID do usuário através dos parâmetros da rota

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  const handleSave = async () => {
    try {
      await Api.put(`/edit/${userId}`, { username, email, location });
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      navigation.goBack(); // Voltar para a tela anterior
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await Api.delete(`/delete/${userId}`);
      Alert.alert('Conta deletada', 'Sua conta foi deletada com sucesso.');
      navigation.navigate('Home'); // Redirecionar para a tela inicial
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      Alert.alert('Erro', 'Não foi possível deletar a conta.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.frame7}>
        <Image
          source={require('../assets/logo.png')} // Atualizar para o arquivo de imagem correto
          style={styles.logo}
        />
      </View>

      <View style={styles.user}>
        <View style={styles.frame3}>
          <View style={styles.vector} />
          <Text style={styles.editarFoto}>Editar foto</Text>
        </View>

        <View style={styles.frame9}>
          <Text style={styles.usuRio}>Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            placeholderTextColor={theme.colors.text}
            onChangeText={setUsername}
            value={username}
          />
        </View>

        <View style={styles.frame10}>
          <Text style={styles.eMail}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={theme.colors.text}
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.frame11}>
          <Text style={styles.regiO}>Região</Text>
          <TextInput
            style={styles.input}
            placeholder="Região"
            placeholderTextColor={theme.colors.text}
            onChangeText={setLocation}
            value={location}
          />
        </View>

        <TouchableOpacity style={styles.frame8} onPress={handleSave}>
          <Text style={styles.salvar}>Salvar</Text>
        </TouchableOpacity>

        <View style={styles.frame12}>
          <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteButton}>
            <Text style={styles.deletarConta}>Deletar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditScreen;
