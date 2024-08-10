import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: theme.fonts.medium,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: theme.colors.surface,
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    color: theme.colors.text,
  },
  button: {
    width: '60%',
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: theme.fonts.bold,
  },
  lineContainer: {
    width: '100%',
    marginVertical: 20,
    alignItems: 'center',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: theme.colors.primary,
  },
  accountContainer: {
    marginTop:15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkPrompt: {
    fontSize: 15,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
  },
  linkText: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    textDecorationLine: 'underline',
  },
});
