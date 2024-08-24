import { StyleSheet } from 'react-native';
import theme from './theme';

const cardPost = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.painting,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: theme.colors.defaultColor,
  },
  username: {
    color: theme.colors.text,
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    marginRight: 10
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    marginBottom:40,
  },
  contentContainer: {
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    color: theme.colors.date,
    fontFamily:theme.fonts.regular,
    alignSelf: 'flex-end',
  },
  content: {
    color: theme.colors.text,
    fontFamily:theme.fonts.regular,
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20
  },
  comments: {
    flexDirection: 'row',
    fontFamily:theme.fonts.regular,
    color:theme.colors.defaultColor,
  },
  commentsText: {
    color: theme.colors.text,
    fontFamily:theme.fonts.regular,
    fontSize: 14,
    marginLeft: 5,
  },
});

export default cardPost;
