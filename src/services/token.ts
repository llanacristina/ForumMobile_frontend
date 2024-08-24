import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@AccessToken:key';

// Armazena o token
export const storeToken = async (token: string): Promise<void> => {
  try {
    if (typeof token !== 'string') {
      throw new Error('O token deve ser uma string.');
    }
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Erro ao armazenar token:', error);
  }
};

// Recupera o token
export const retrieveToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token ? token : null;
  } catch (error) {
    console.error('Erro ao recuperar o token:', error);
    return null;
  }
};

// Deleta o token
export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao deletar token:', error);
  }
};


// Obtém o cabeçalho de autorização
export const getAuthHeader = async () => {
  const token = await retrieveToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};
