import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  Profile: undefined;
  Home: undefined;
  Main: { screen: string };
  Edit: undefined;
  // Adicione outras telas aqui
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
