import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  Profile: undefined;
  // Adicione outras telas aqui
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
