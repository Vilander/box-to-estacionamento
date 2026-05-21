import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { CarStorage, CarStorageItem } from '../../storage/carStorage';

interface Carro extends CarStorageItem {}

export default function App() {
  const [placa, setPlaca] = useState('');
  const [listaCarros, setListaCarros] = useState<Carro[]>([]);

  useEffect(() => {
    async function loadCars() {
      const storedCars = await CarStorage.getCars();
      setListaCarros(storedCars);
    }

    loadCars();
  }, []);

  const adicionarCarro = async () => {
    if (!placa.trim()) return;
    
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const valorInicial = 5.00; 
    
    const novoCarro: Carro = {
      id: Math.random().toString(),
      placa: placa.toUpperCase(),
      hora: horaAtual,
      entradaHora:Date.now(),
      valor: valorInicial,
    };
    
    //console.log("aqui")
    const updatedCars = await CarStorage.addCar(novoCarro);
    setListaCarros(updatedCars);
    setPlaca('');
  };

const calcularValorCobrado = (carro: Carro) => {
    const agora = Date.now();
    const permanencia = agora - carro.entradaHora;
    const diferencaHoras = permanencia / (1000 * 60 * 60);
    //const diferencaHoras = permanencia / (60*60); //teste por segundo

    if (diferencaHoras <= 1) return carro.valor; 
    
    const horasExtras = Math.ceil(diferencaHoras - 1); 
    
    return carro.valor + (horasExtras * 1.00); 
  };

  const fecharConta = (carro: Carro) => {
    const valorFinal = calcularValorCobrado(carro);

    Alert.alert(
      'Saída de Veículo',
      `Placa: ${carro.placa}\nEntrada: ${carro.hora}\nValor: ${valorFinal.toFixed(2).replace('.', ',')}`,
      [
        { 
          text: 'Cancelar', 
          style: 'cancel' 
        },
        {
          text: 'Liberar Vaga',
          onPress: async () => {
            const updatedCars = await CarStorage.removeCar(carro.id);
            setListaCarros(updatedCars);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Vagas do BoxTo</Text>

      <View style={styles.formularioLinha}>
        <Input
          placeholder="Digite a placa (ex: ABC1234)"
          value={placa}
          onChangeText={(texto) => setPlaca(texto.toUpperCase())}
        />
        <Button valor="Entrada" isAtivado={true} onPress={adicionarCarro} />
      </View>

      <FlatList
        data={listaCarros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.vagaCard}>
            <Text style={styles.vagaTexto}>
              {item.placa}  |  {item.hora}
            </Text>

            <TouchableOpacity style={styles.botaoFechar} onPress={() => fecharConta(item)}>
              <Text style={styles.textoBotaoFechar}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
