import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  token: string | null;
  id: string; 
  username: string; 
  email: string;
  profileURL: string | null; 
  location: string; 
};

type UserContextProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  posts: any[];
  setPosts: (posts: any[]) => void;
};

export const UserContext = createContext<UserContextProps | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    token: null,
    id: '', 
    username: '', 
    email: '', 
    profileURL: '',
    location: '', 
  });

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser: User = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const saveUserData = async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Erro ao salvar dados do usuário:', error);
      }
    };

    if (user.token) { 
      saveUserData();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser,posts, setPosts  }}>
      {children}
    </UserContext.Provider>
  );
};
