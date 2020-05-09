import Reactotron from 'reactotron-react-native';
import { AsyncStorage } from 'react-native';

if (__DEV__) {
  // __DEV__ é uma variável global do react native que retorna true quando o usuário está emulando o app em modo de desenvolvimento.
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure()
    .useReactNative()
    .connect();
  console.tron = tron;
  tron.clear();
}
