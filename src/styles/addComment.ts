import { StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 34,
    height: 34,
    backgroundColor: theme.colors.surface,
    borderRadius: 17,
  },
  username: {
    marginLeft: 10,
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  postContentContainer: {
    backgroundColor: theme.colors.painting,
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  postContent: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  commentContainer: {
    backgroundColor: theme.colors.painting,
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  commentText: {
    color: theme.colors.text,
    fontSize: 10,
    fontWeight: '400',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#781CBF',
    marginBottom: 20,
  },
  commentCount: {
    color: theme.colors.text,
    fontSize: 8,
  },
  postDate: {
    color: '#781CBF',
    fontSize: 8,
  },
  commentInputContainer: {
    backgroundColor: '#13042C',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButtonText: {
    color: theme.colors.text,
    fontSize: 14,
  },
});

export default styles;
