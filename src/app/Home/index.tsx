import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from './style';
import Input from "../../components/Input";
import Button from "../../components/Button";

interface Carro {
  id: string;
  placa: string;
  hora: string;
}

export default function App() {
  const [placa, setPlaca] = useState('');
  const [listaCarros, setListaCarros] = useState<Carro[]>([]);

  const adicionarCarro = () => {
    if (!placa.trim()) return;

    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const novoCarro = {
      id: Math.random().toString(),
      placa: placa.toUpperCase(),
      hora: horaAtual, 
    };

    setListaCarros([...listaCarros, novoCarro]);
    setPlaca('');
  };

  const fecharConta = (carro: Carro) => {
    Alert.alert(
      'Saída de Veículo',
      `Placa: ${carro.placa}\nEntrada: ${carro.hora}\nValor Fixo: R$ 5,00`,
      [{
        text: 'Liberar Vaga',
        onPress: () => setListaCarros(listaCarros.filter(c => c.id !== carro.id))
      }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Vagas do BoxTo</Text>

      <View style={styles.formularioLinha}>
        <Input 
          placeholder="Digite a placa (ex: ABC-1234)" 
          value={placa}
          onChangeText={(texto) => setPlaca(texto.toUpperCase())}
        />
        <Button 
          valor="Entrada" 
          isAtivado={true} 
          onPress={adicionarCarro} 
        />
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