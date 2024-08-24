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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
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
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: theme.colors.surface,
    width: '100%',
  },
  locationInput: {
    flex: 1,
    height: 50,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
  },
  locationIcon: {
    marginLeft: 10,
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
    fontSize: 18,
    fontFamily: theme.fonts.bold,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 15,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
