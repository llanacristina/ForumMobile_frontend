import AsyncStorage from "@react-native-async-storage/async-storage";

interface IUserData {
    token: string | null ;
    id: string ;
    username: string | null;
    email: string | null;
    profileURL?: string | null;
    location?: string;
}

const USER_DATA_KEY = '@UserData:key';

// Função para recuperar os dados do usuário
const retrieveUserData = async (): Promise<IUserData | null> => {
  try {
    const data = await AsyncStorage.getItem(USER_DATA_KEY);
    if (data) {
      return JSON.parse(data) as IUserData;
    }
    return null;
  } catch (error) {
    console.error('Erro ao recuperar dados do usuário:', error);
    return null;
  }
};

// Função para armazenar os dados do usuário
const storeUserData = async (data: IUserData): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao armazenar dados do usuário:', error);
  }
};

// Função para deletar os dados do usuário
const deleteUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
    console.log('Dados do usuário deletados.');
  } catch (error) {
    console.error('Erro ao deletar dados do usuário:', error);
  }
};

// Função para atualizar os dados do usuário
const updateUserData = async (updatedData: Partial<IUserData>): Promise<void> => {
  try {
    const currentData = await retrieveUserData();
    if (currentData) {
      const newData = { ...currentData, ...updatedData };
      await storeUserData(newData);
    }
  } catch (error) {
    console.error('Erro ao atualizar dados do usuário:', error);
  }
};

export {
  IUserData,
  retrieveUserData,
  storeUserData,
  deleteUserData,
  updateUserData
};
