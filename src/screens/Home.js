import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../contexts/auth";
import { TaskItem } from '../components/TaskItem'; 
import { TextInput } from 'react-native-gesture-handler';

export function Home() {
  const { user, logout } = useContext(AuthContext);
  
  // Estado para controlar a lista de tarefas
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  // Função para carregar tarefas do armazenamento local
  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = await AsyncStorage.getItem(`tasks_${user?.email}`);
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        Alert.alert('Erro ao carregar tarefas');
      }
    }

    loadTasks();
  }, []);

  // Função para salvar tarefas no armazenamento local
  useEffect(() => {
    async function saveTasks() {
      try {
        await AsyncStorage.setItem(`tasks_${user?.email}`, JSON.stringify(tasks));
      } catch (error) {
        Alert.alert('Erro ao salvar tarefas');
      }
    }

    if (tasks.length > 0) {
      saveTasks();
    }
  }, [tasks]);

  // Função para adicionar nova tarefa
  function addTask() {
    if (text) {
      setTasks([...tasks, { id: Date.now().toString(), text, isFavorite: false }]);
      setText(''); // Limpa o input
    }
  }

  // Função para marcar como favorito
  function handleFavorite(id) {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
    ));
  }

  // Função para deletar tarefa
  function handleDelete(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <View style={styles.WelcomeView}>
        <Text style={styles.titleLargue}>Seja bem-vindo, {user?.email}!</Text>

        {/* Input com lupa */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Digite aqui"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.iconContainer} onPress={addTask}>
            <AntDesign name="pluscircle" size={24} color="#292929" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de tarefas */}
      <View style={styles.menuTasks}>
        <Text style={styles.titleMedium}>Tasks do Dia</Text>
        
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskItem 
              task={item} 
              onFavorite={handleFavorite} 
              onDelete={handleDelete} 
            />
          )}
        />
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
});
