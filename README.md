# BoxTo Estacionamento

Aplicativo de gerenciamento simples de vagas de estacionamento criado com Expo e React Native.

## Descrição

O app permite registrar carros que entram no estacionamento, exibindo a placa e o horário de entrada. Ao tocar no botão de saída, uma confirmação é exibida e o veículo é removido da lista.

## Funcionalidades

- Registrar entrada de carro por placa
- Exibir lista de carros em uso com horário de entrada
- Remover carro ao liberar a vaga
- Alertas de confirmação ao encerrar a conta

## Estrutura do projeto

- `src/app/Home/index.tsx` — tela principal com lógica de cadastro e fechamento de contas
- `src/components/Input/index.tsx` — campo de entrada de texto para a placa
- `src/components/Button/index.tsx` — botão customizado reutilizável
- `app.json` — configuração do Expo
- `package.json` — dependências e scripts do projeto

## Como funciona

### `Home/index.tsx`

- `placa`: estado que armazena o valor digitado no campo de entrada
- `listaCarros`: estado que guarda os carros atualmente estacionados
- `adicionarCarro()`: adiciona um novo carro à lista com placa em maiúsculas e hora atual formatada
- `fecharConta(carro)`: exibe um `Alert` com informações do veículo e remove o carro da lista se o usuário confirmar
- `FlatList`: renderiza cada item da lista com a placa, horário e botão de fechamento

### `Input/index.tsx`

- Componente baseado em `TextInput`
- Configurações:
  - `autoCapitalize="characters"`
  - `autoCorrect={false}`
  - `keyboardType="default"`
  - `maxLength={8}`
- Recebe props adicionais por `...rest`

### `Button/index.tsx`

- Componente baseado em `TouchableOpacity`
- Props:
  - `valor`: texto exibido no botão
  - `isAtivado`: controla se o botão está ativo ou desativado
  - `activeOpacity`: opcional, define opacidade ao pressionar
  - `onPress`: callback acionado ao tocar no botão
- O botão desativa a interação quando `isAtivado` é `false`

## Requisitos

- Node.js instalado
- Expo CLI instalado globalmente (opcional, mas recomendado)
- Um emulador Android/iOS ou Expo Go no celular

## Instalação

1. Abra o terminal na pasta do projeto:
   ```bash
   cd c:\Users\vilander.ascosta\Documents\GitHub\boxto-estacionamento\box-to-estacionamento
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Executar o app

- Iniciar o Expo:
  ```bash
  npm start
  ```

- Abrir no Android:
  ```bash
  npm run android
  ```

- Abrir no iOS:
  ```bash
  npm run ios
  ```

- Abrir na web:
  ```bash
  npm run web
  ```

## Uso

1. Digite a placa do carro no campo de texto.
2. Toque em `Entrada` para registrar a vaga.
3. A lista exibirá a placa e o horário de entrada.
4. Toque no botão `✕` para liberar a vaga.
5. Confirme a saída na janela de alerta.

## Observações

- O valor do estacionamento é fixo como `R$ 5,00` na confirmação de saída.
- O sistema não salva dados entre execuções; os carros são mantidos apenas em memória.
