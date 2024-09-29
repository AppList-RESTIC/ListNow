import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Pacote de ícones do Expo
import { AuthContext } from "../contexts/auth";
import { TextInput } from 'react-native-gesture-handler';

export function Home() {
  const { user, logout } = useContext(AuthContext);

  // Definir estado para controlar o valor do TextInput
  const [text, setText] = useState('');

  function sair() {
    logout();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.WelcomeView}>
        <Text style={styles.titleLargue}>Seja bem-vindo, </Text>
        <Text style={styles.titleLargue}>{user?.email}!</Text>

        {/* View para o input com o ícone de lupa */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Digite aqui"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.iconContainer}>
            <AntDesign name="search1" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuTasks}>
        <Text style={styles.titleMedium}>Tasks do Dia</Text>
        <TouchableOpacity style={styles.btnFlutuanteAdd}>
          +
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  menuTasks: {
    flex: 1,
    width: '100%',
    marginTop: '70%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 32,
  },
  btnFlutuanteAdd: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#292929',
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  WelcomeView: {
    marginTop: 80,
    paddingLeft: 32,
  },
  titleLargue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  titleMedium: {
    paddingTop: 26,
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: 20,
    width: '90%',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  iconContainer: {
    padding: 8,
  },
  btSair: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#86a6df',
  },
});
