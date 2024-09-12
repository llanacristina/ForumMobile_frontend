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
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.defaultColor,
  },
  editIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    padding: 8,
  },
  editPhotoText: {
    color: theme.colors.primary,
    fontSize: 15,
    fontFamily: theme.fonts.medium,
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
    color: theme.colors.text,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    marginBottom: 20,
  },
  saveButton: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.bold,
  },
  deleteButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexDirection:'row',
  },
  deleteButtonText: {
    color: theme.colors.error,
    fontSize: 15,
    fontFamily: theme.fonts.bold,
  },
  placeholderColor: {
    color: theme.colors.defaultColor,
  },
});

export default styles;
