import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    paddingTop: 50,
  },
  newPostContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.painting,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    padding:20
  },
  newPostText: {
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.medium,
  },
  postButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    color: theme.colors.text,
  },
  postButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
  },
  postContainer: {
    backgroundColor: theme.colors.painting,
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
  },
  postUser: {
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: 5,
    padding: 12,
    borderRadius: 20,
  },
  postContent: {
    color: theme.colors.text,
  },
});
