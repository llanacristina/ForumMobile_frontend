import { StyleSheet } from 'react-native';

const cardPost = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePosted: {
    color: '#A1A1A1',
    fontSize: 12,
  },
  content: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  commentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default cardPost;
