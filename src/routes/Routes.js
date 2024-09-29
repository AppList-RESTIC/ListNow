import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/Login';
import { Home } from '../screens/Home';
import { BemVindo } from '../screens/BemVindo'; // Importe a nova tela
import { AuthContext } from '../contexts/auth';

const Stack = createStackNavigator();

export function Routes() {
  const { user } = useContext(AuthContext);

  if (user.status !== 'Logado') {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Adicione a tela de Bem-vindo antes da tela de login */}
        <Stack.Screen name="BemVindo" component={BemVindo} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  }
}
