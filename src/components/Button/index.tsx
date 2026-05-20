import { TouchableOpacity, Text } from 'react-native';
import { styles } from './style';

interface ButtonProps {
  valor: string;
  isAtivado: boolean;
  activeOpacity?: number;
  onPress: () => void;
}

export default function Button({ valor, isAtivado, activeOpacity, onPress }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.botao, !isAtivado && styles.botaoDesativado]} 
      
      disabled={!isAtivado} 
      activeOpacity={activeOpacity ?? 0.7} 
      onPress={onPress}
    >
      <Text style={styles.texto}>
        {valor}
      </Text>
    </TouchableOpacity>
  );
}