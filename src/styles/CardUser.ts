import { StyleSheet } from 'react-native';
import theme from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  background: {
    flexDirection: 'row',
    backgroundColor: theme.colors.painting,
    borderRadius: 15,
    padding: 10,
  },
  picture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: theme.colors.defaultColor, 
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: theme.fonts.medium,
  },
  name: {
    fontSize: 16,
    fontFamily:theme.fonts.bold,
    color: theme.colors.text,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.text,
  },
});

export default styles;
