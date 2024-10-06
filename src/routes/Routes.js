import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { AddTask } from '../screens/AddTask';
import { FilteredTasks } from '../screens/FilteredTasks'; 
import { Help } from '../screens/Help';
import { Login } from '../screens/Login';
import { BemVindo } from '../screens/BemVindo'; // Certifique-se que foi importada corretamente
import { AuthContext } from '../contexts/auth';

const Stack = createStackNavigator();

export function Routes() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Condicional invertida para mostrar as telas corretas */}
      {!user || user.status !== 'Logado' ? (
        <>
          <Stack.Screen name="BemVindo" component={BemVindo} />
          <Stack.Screen name="Login" component={Login} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddTask" component={AddTask} />
          <Stack.Screen name="FilteredTasks" component={FilteredTasks} />
          <Stack.Screen name="Help" component={Help} />
        </>
      )}
    </Stack.Navigator>
  );
}