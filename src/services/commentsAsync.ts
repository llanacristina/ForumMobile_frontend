import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar os comentários no AsyncStorage
const saveComments = async (postId: string, comments: any[]): Promise<void> => {
  try {
    const key = `comments_${postId}`;
    await AsyncStorage.setItem(key, JSON.stringify(comments));
  } catch (error) {
    console.error('Erro ao salvar comentários:', error);
  }
};

// Função para recuperar comentários do AsyncStorage
const loadCommentsFromStorage = async (postId: string): Promise<any[]> => {
  try {
    const key = `comments_${postId}`;
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Erro ao recuperar comentários:', error);
    return [];
  }
};

// Função para limpar os comentários do AsyncStorage (opcional)
const clearComments = async (postId: string): Promise<void> => {
  try {
    const key = `comments_${postId}`;
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Erro ao limpar comentários:', error);
  }
};

export {
  saveComments,
  loadCommentsFromStorage,
  clearComments,
};
