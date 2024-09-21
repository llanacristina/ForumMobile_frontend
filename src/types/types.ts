import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Post } from './object';

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: { newLocation?: { latitude: string; longitude: string } };  
  Home: undefined;
  Profile?: { userId: string };
  Main: { screen: string };
  Edit: { profileURL: string | null };
  MapScreen:  undefined;
  AddCommentScreen: {postId: string};
  // Adicione outras telas aqui
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export { Post };
