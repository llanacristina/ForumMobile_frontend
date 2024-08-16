import { StyleSheet } from 'react-native';
import theme from './theme';

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo semitransparente
    
  },
  modalContainer: {
    width: '90%',
    padding: 30,
    backgroundColor: theme.colors.painting,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: theme.colors.text,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor:theme.colors.surface,
    borderRadius:10,
    marginTop:30,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textArea: {
    width: '100%',
    height: 150,
    borderRadius:10,
    backgroundColor:theme.colors.surface,
    fontFamily: theme.fonts.regular,
    padding: 10,
    marginBottom: 20,
    color: theme.colors.text,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    width:100
  },
  createButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    textAlign:'center'
  },
});

export default modalStyles;
