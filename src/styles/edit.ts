import { StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    marginTop: 50,
  },
  editPhotoContainer: {
    width: 340,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vectorIcon: {
    width: 34,
    height: 34,
    backgroundColor: theme.colors.primary,
  },
  editPhotoText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    fontWeight: '600',
  },
  inputContainer: {
    width: 280,
    height: 34, 
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
    marginBottom: 15,
    justifyContent: 'center',
  },
  input: {
    color: theme.colors.text,
    fontSize: 12,
    fontFamily: theme.fonts.regular,
  },
  placeholderColor: {
    color: theme.colors.defaultColor,
  },
  saveButton: {
    width: 103,
    height: 34,
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Centraliza o botão na horizontal
    marginTop: 20, // Espaçamento após o último input
  },
  saveButtonText: {
    width: 59,
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    fontWeight: '600',
  },
  deleteButton: {
    width: 103,
    height: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Centraliza o botão na horizontal
    marginTop: 15, // Espaçamento abaixo do botão "Salvar"
  },
  deleteButtonText: {
    color: theme.colors.error,
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    fontWeight: '600',
  },
});

export default styles;
