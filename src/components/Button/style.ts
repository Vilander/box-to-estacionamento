import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#ff7b00', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    height: 50,
    marginTop: 10,
  },
  
  botaoDesativado: {
    backgroundColor: '#a1a1a1', 
  },

  texto: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});