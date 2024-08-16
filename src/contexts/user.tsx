import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  token: string | null;
  id: string | null;
  username: string | null;
  email: string | null;
  profileURL: string | null;
  location?: string;
};

type UserContextProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContextProps | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    token: null,
    id: null,
    username: null,
    email: null,
    profileURL: null,
    location: '', // Definindo como string vazia por padrão
  });

  useEffect(() => {
    // Função para recuperar os dados do usuário armazenados
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    // Função para salvar os dados do usuário no AsyncStorage
    const saveUserData = async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Erro ao salvar dados do usuário:', error);
      }
    };

    if (user.token) { // Apenas salva se o token existir
      saveUserData();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
