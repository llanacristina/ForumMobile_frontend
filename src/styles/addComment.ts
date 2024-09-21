import { StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop:20,
  },
  contentContainer: {
    padding: 16,
    flex:1
  },
  commentListContainer: {
    flexGrow: 1,
    paddingBottom: 20, 
  },
  noCommentsText: {
    color: theme.colors.text,
    fontFamily:theme.fonts.regular,
    textAlign: 'center',
    marginTop: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  },
  commentContainer: {
    backgroundColor: theme.colors.painting,
    padding: 30,
    borderRadius: 6,
    marginBottom: 10,
  },
  commentHeader: {
    marginBottom: 4,
  },
  commentText: {
    color: theme.colors.text,
    fontFamily:theme.fonts.regular,
    marginTop:20,
    fontSize: 15,
  },
  commentUser: {
  color: theme.colors.text,
  fontFamily: theme.fonts.bold,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor:theme.colors.primary,
    marginBottom: 20,
  },
  commentCount: {
    fontFamily:theme.fonts.regular,
    color: theme.colors.text,
    fontSize: 10,
  },
  postDate: {
    color: theme.colors.text,
    fontSize: 10,
    fontFamily:theme.fonts.regular,
  },
  commentInputContainer: {
    backgroundColor: theme.colors.painting,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20
  },
  commentInput: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 14,
    fontFamily:theme.fonts.regular,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButtonText: {
    color: theme.colors.text,
    fontFamily:theme.fonts.regular,
    fontSize: 14,
  },
});

export default styles;
