import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
    paddingTop: 60,
    paddingHorizontal: 20,
    alignContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333333',
  },
  formularioLinha: {
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'center',
  },
  
  vagaCard: {
    backgroundColor: '#f0f0f0', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    position: 'relative',
  },
  vagaTexto: {
    fontSize: 18,
    color: '#333333',
  },
  botaoFechar: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 8,
  },
  textoBotaoFechar: {
    color: '#ff0000',
    fontSize: 18,
    fontWeight: 'bold',
  },

});