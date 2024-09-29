import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export function BemVindo({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Button 
        title="Acessar Login" 
        onPress={() => navigation.navigate('Login')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
