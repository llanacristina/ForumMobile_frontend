import { StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.defaultColor
  },
  editIcon: {
    right: 20,
    bottom: -40,
    backgroundColor: theme.colors.defaultColor,
    borderRadius: 50,
    padding: 5,
  },
  profileInfo: {
    marginLeft: 16,
  },
  email: {
    fontSize: 16,
    fontFamily:theme.fonts.regular,
    color: theme.colors.defaultColor,
  },
  profileName: {
    marginBottom:20,
    fontSize: 18,
    fontFamily:theme.fonts.regular,
    color: theme.colors.text,
  },
  profileLocation: {
    fontSize: 14,
    color: theme.colors.text,
    fontFamily:theme.fonts.regular,
    marginTop: 4,
  },
  threeDotsIcon: {
    marginLeft: 'auto',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily:theme.fonts.bold,
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.text,
    fontFamily:theme.fonts.regular,
  },
  postsContainer: {
    // marginTop: 20,
    // paddingHorizontal: 10,
    paddingBottom:16
  },
});

export default styles;
