import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#7159c1',
  },
  headerTintColor: '#fff',
};

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Usuários" component={Main} />
        <Stack.Screen name="Usuário" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
