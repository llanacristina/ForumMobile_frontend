import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#5D1397', // Cor do botão criar conta
    background: '#060510', // Cor de fundo das páginas
    surface: '#320952', // Cor dos inputs
    text: '#FFFFFF', // Cor do texto
    placeholder: '#FFFFFF', // Cor do texto de placeholder
    error: '#FF0000', // Cor de erro 
  },
  fonts: {
    regular: 'Poppins-Regular', // Fonte regular
    medium: 'Poppins-Medium', // Fonte média
    bold: 'Poppins-Bold', // Fonte negrito
  },
};

export default theme;
