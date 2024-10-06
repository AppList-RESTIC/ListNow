import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TaskItem } from '../components/TaskItem';
import { Ionicons } from '@expo/vector-icons'; // Ícone de seta para voltar
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export function FilteredTasks({ route, navigation }) {
  const { filter, tasks, onDelete, onFavorite, user } = route.params;

  // Função para filtrar as tarefas de acordo com o filtro selecionado
  function getFilteredTasks() {
    const currentDate = moment(); // Data atual

    if (filter === 'open') {
      return tasks.filter(task => task.date === currentDate.format('DD/MM/YYYY'));
    } else if (filter === 'completed') {
      return tasks.filter(task => {
        const taskDate = moment(task.date, 'DD/MM/YYYY');
        return taskDate.isBefore(currentDate);
      });
    } else {
      return tasks; // Retorna todas as tarefas
    }
  }

  const filteredTasks = getFilteredTasks();

  // Função para salvar as tarefas no AsyncStorage
  async function saveTasksToStorage(updatedTasks) {
    try {
      await AsyncStorage.setItem(`tasks_${user?.email}`, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  }

  // Função para deletar a tarefa
  const handleDelete = async (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id); // Filtrar da lista original
    await saveTasksToStorage(updatedTasks);
    onDelete(id); // Chama a função para atualizar o estado na tela anterior
    navigation.goBack(); // Volta para a tela anterior após deletar
  };

  // Função para favoritar a tarefa
  const handleFavorite = async (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
    );
    await saveTasksToStorage(updatedTasks);
    onFavorite(id); // Chama a função para atualizar o estado na tela anterior
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {filter === 'open' ? 'Tarefas em Aberto' : filter === 'completed' ? 'Tarefas Concluídas' : 'Todas as Tarefas'}
        </Text>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()} // Certifique-se de que o ID seja uma string
        renderItem={({ item }) => (
          <TaskItem 
            task={item} 
            onDelete={handleDelete} // Passa a função para deletar
            onFavorite={handleFavorite} // Passa a função para favoritar
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#292929',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});