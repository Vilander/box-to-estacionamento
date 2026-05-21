import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
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
              {/* <Text style={styles.textoBotaoFechar}>X</Text> */}
              <Image 
                source={{ uri: 'data:image/png;base64,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' }}
                style={{ width: 20, height: 20 }} 
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
