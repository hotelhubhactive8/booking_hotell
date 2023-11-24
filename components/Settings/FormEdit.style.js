import COLOR from '../../constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 10,
  },

  inputContainer: {
    marginTop: 20,
    gap: 5,
  },

  head: {
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: -10,
  },

  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  input: {
    borderBottomWidth: 0.6,
    fontSize: 17,
  },

  logout: {
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: 'black',
  },

  touchText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },

  save: {
    borderRadius: 5,
    padding: 12,
    backgroundColor: COLOR.primary,
    marginTop: 50,
  },

  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalTouch: {
    minWidth: '100%',
    padding: 8,
    borderTopColor: 'black',
    borderTopWidth: 0.5,
  },
});

export default styles;
