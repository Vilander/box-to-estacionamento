import { TextInput, TextInputProps } from 'react-native';
import { styles } from './style';

export default function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput 
      style={styles.input} 
      autoCapitalize="characters"
      autoCorrect={false}
      keyboardType="default"
      editable={true}
      maxLength={8}
      {...rest} 
    />
  );
}