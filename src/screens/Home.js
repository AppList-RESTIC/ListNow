import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../contexts/auth";
import { TaskItem } from '../components/TaskItem'; 
import { TextInput } from 'react-native-gesture-handler';
import moment from 'moment'; 

export function Home({ navigation, route }) {  
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [todayDate] = useState(moment().format('DD/MM/YYYY')); 

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

  useEffect(() => {
    if (tasks.length > 0) {
      saveTasksToStorage(tasks);
    }
  }, [tasks]);

  async function saveTasksToStorage(updatedTasks) {
    try {
      await AsyncStorage.setItem(`tasks_${user?.email}`, JSON.stringify(updatedTasks));
    } catch (error) {
      Alert.alert('Erro ao salvar tarefas');
    }
  }

  useEffect(() => {
    if (route.params?.newTask) {  
      const updatedTasks = [...tasks, route.params.newTask];
      setTasks(updatedTasks);
      saveTasksToStorage(updatedTasks);
    }
  }, [route.params?.newTask]);

  function handleFavorite(id) {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
    ));
  }

  function handleDelete(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  }

  function handleFilterTasks(filter) {
    navigation.navigate('FilteredTasks', { 
      filter, 
      tasks, 
      onDelete: handleDelete,
      onFavorite: handleFavorite,
      user: user 
    });
  }

  const todayTasks = tasks.filter(task => 
    task.date === todayDate && task.name.includes(text)
  );

  return (
    <View style={styles.container}>
      <View style={styles.WelcomeView}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleLargue}>Seja bem-vindo, {user?.email}!</Text>
          <TouchableOpacity style={styles.helpIcon} onPress={() => navigation.navigate('Help')}>
            <AntDesign name="questioncircleo" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Filtrar tarefas"
            placeholderTextColor="#aaa"
          />
        </View>
      </View>

      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => handleFilterTasks('open')}
        >
          <Text style={styles.buttonText}>Tarefas em Aberto</Text>
          <AntDesign  name="edit" size={26} color="#292929 " style={styles.filterButtonsIco} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => handleFilterTasks('completed')}
        >
          <Text style={styles.buttonText}>Tarefas Concluídas</Text>
          <AntDesign  name="check" size={26} color="#292929 " style={styles.filterButtonsIco} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => handleFilterTasks('total')}
        >
          <Text style={styles.buttonText}>Tarefas Totais</Text>
          <AntDesign  name="earth" size={26} color="#292929 " style={styles.filterButtonsIco} />
        </TouchableOpacity>
      </View>

      <View style={styles.menuTasks}>
        <Text style={styles.titleMedium}>Tasks do Dia - {todayDate}</Text>

        <FlatList
          data={todayTasks}  
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskItem 
              task={item} 
              onFavorite={handleFavorite} 
              onDelete={handleDelete} 
            />
          )}
          showsVerticalScrollIndicator={true}
          style={styles.taskList}
        />
      </View>

      <TouchableOpacity style={styles.addTaskButton} onPress={() => navigation.navigate('AddTask')}>
        <AntDesign name="pluscircle" size={50} color="#292929" />
      </TouchableOpacity>
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
    marginTop: 100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 16,
  },
  taskList: {
    flexGrow: 1,
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
  headerContainer: {
    marginRight: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    marginTop: 60,
    width:'100%',
    maxWidth: '100%'
  },
  filterButton: {
    height:150,
    width:120,
    backgroundColor: '#D6DCD7',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    justifyContent:'center',
    alignItems: 'center',
  },
  filterButtonsIco:{
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#292929',
    fontSize: 16,
    fontWeight:'bold',
  },
  addTaskButton: {
    position: 'absolute',  
    right: 30,
    bottom: '6%',
  },
});
