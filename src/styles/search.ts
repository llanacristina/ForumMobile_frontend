import { StyleSheet } from 'react-native';
import theme from './theme'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10,
  },
  frame7: {
    width: 314,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
  },
  frame8: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#320952',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 12,
  },
  searchButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    padding: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 12,
  },
  postList: {
    flex: 1,
  },
  postItem: {
    padding: 10,
    borderBottomColor: '#7A1AC4',
    borderBottomWidth: 2,
  },
  postText: {
    color: 'white',
    fontSize: 12,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  menu: {
    width: 360,
    height: 72,
    backgroundColor: '#270740',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    width: 22,
    alignItems: 'center',
  },
  menuIcon: {
    width: 15,
    height: 17,
    backgroundColor: 'white',
  },
  menuText: {
    color: 'white',
    fontSize: 8,
    fontFamily: 'Poppins',
    fontWeight: '500',
    marginTop: 2,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    width: 80,
    height: 25,
    backgroundColor: '#320952',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  header: {
    width: 314,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLogo: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
  },
  headerIcon: {
    width: 12,
    height: 20,
    backgroundColor: 'white',
  },
});

export default styles;
