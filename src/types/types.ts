import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: { newLocation?: { latitude: string; longitude: string } };  
  Home: undefined;
  Profile: undefined;
  Main: { screen: string };
  Edit: undefined;
  MapScreen:  undefined;
  // Adicione outras telas aqui
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
