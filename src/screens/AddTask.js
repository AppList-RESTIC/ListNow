import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/auth';
import { AntDesign } from '@expo/vector-icons';

export function AddTask({ navigation }) {
  const { user } = useContext(AuthContext);

  // Estados para armazenar os valores da tarefa
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskDetails, setTaskDetails] = useState('');

  // Função para adicionar a nova tarefa
  async function handleAddTask() {
    if (!taskName || !taskDate || !taskDetails) {
      Alert.alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      const storedTasks = await AsyncStorage.getItem(`tasks_${user?.email}`);
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];

      const newTask = {
        id: Date.now().toString(),
        name: taskName,
        date: taskDate,
        details: taskDetails,
        status: 'open', // Status inicial é em aberto
        isFavorite: false,
      };

      const updatedTasks = [...tasks, newTask];
      await AsyncStorage.setItem(`tasks_${user?.email}`, JSON.stringify(updatedTasks));

      Alert.alert('Tarefa adicionada com sucesso');

      // Passando a nova tarefa de volta para a Home
      navigation.navigate('Home', { newTask });
    } catch (error) {
      Alert.alert('Erro ao adicionar a tarefa');
    }
  }

  // Função para formatar a entrada de data
  const handleDateChange = (text) => {
    const formattedDate = text
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/(\d{2})(\d)/, '$1/$2') // Adiciona a primeira barra após o dia
      .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3'); // Adiciona a barra após o mês

    setTaskDate(formattedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Criar Tarefa</Text>
      <Text style={styles.label}>Nome da Tarefa</Text>
      <TextInput
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Digite o nome da tarefa"
      />

      <Text style={styles.label}>Data (DD/MM/YYYY)</Text>
      <TextInput
        style={styles.input}
        value={taskDate}
        onChangeText={handleDateChange} // Usa a função de formatação
        placeholder="Digite a data da tarefa"
        keyboardType="numeric" // Permite apenas números
      />

      <Text style={styles.label}>Detalhes</Text>
      <TextInput
        style={styles.input}
        value={taskDetails}
        onChangeText={setTaskDetails}
        placeholder="Digite os detalhes da tarefa"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <AntDesign name="checkcircle" size={24} color="white" />
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      {/* Botão para voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#292929',
  },
  Title: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ECE653',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 5,
  },
});


// //NOVO (Quebrado)
// import React, { useState, useContext } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from '../contexts/auth';
// import { AntDesign } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export function AddTask({ navigation }) {
//   const { user } = useContext(AuthContext);

//   // Estados para armazenar os valores da tarefa
//   const [taskName, setTaskName] = useState('');
//   const [taskDate, setTaskDate] = useState(new Date()); // Inicia com a data atual
//   const [taskDetails, setTaskDetails] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar o DatePicker

//   // Função para adicionar a nova tarefa
//   async function handleAddTask() {
//     if (!taskName || !taskDetails) {
//       Alert.alert('Por favor, preencha todos os campos');
//       return;
//     }

//     try {
//       const storedTasks = await AsyncStorage.getItem(`tasks_${user?.email}`);
//       const tasks = storedTasks ? JSON.parse(storedTasks) : [];

//       const newTask = {
//         id: Date.now().toString(),
//         name: taskName,
//         date: taskDate.toLocaleDateString(), // Formata a data para string
//         details: taskDetails,
//         status: 'open', // Status inicial é em aberto
//         isFavorite: false,
//       };

//       const updatedTasks = [...tasks, newTask];
//       await AsyncStorage.setItem(`tasks_${user?.email}`, JSON.stringify(updatedTasks));

//       Alert.alert('Tarefa adicionada com sucesso');

//       // Passando a nova tarefa de volta para a Home
//       navigation.navigate('Home', { newTask });
//     } catch (error) {
//       Alert.alert('Erro ao adicionar a tarefa');
//     }
//   }

//   const onChangeDate = (event, selectedDate) => {
//     // Verifica se o valor de selectedDate é válido
//     if (event.type === 'set') {
//       const currentDate = selectedDate || taskDate;
//       setShowDatePicker(false);
//       setTaskDate(currentDate);
//     } else {
//       setShowDatePicker(false); // Se o modal foi fechado sem seleção
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.Title}>Criar Tarefa</Text>
//       <Text style={styles.label}>Nome da Tarefa</Text>
//       <TextInput
//         style={styles.input}
//         value={taskName}
//         onChangeText={setTaskName}
//         placeholder="Digite o nome da tarefa"
//       />

//       <Text style={styles.label}>Data</Text>
//       <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
//         <Text>{taskDate.toLocaleDateString()}</Text> {/* Mostra a data formatada */}
//       </TouchableOpacity>

//       {showDatePicker && (
//         <DateTimePicker
//           value={taskDate}
//           mode="date"
//           display="default"
//           onChange={onChangeDate} // Usando a nova função para lidar com a mudança de data
//         />
//       )}

//       <Text style={styles.label}>Detalhes</Text>
//       <TextInput
//         style={styles.input}
//         value={taskDetails}
//         onChangeText={setTaskDetails}
//         placeholder="Digite os detalhes da tarefa"
//       />

//       <TouchableOpacity style={styles.button} onPress={handleAddTask}>
//         <AntDesign name="checkcircle" size={24} color="white" />
//         <Text style={styles.buttonText}>Adicionar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#292929',
//   },
//   Title: {
//     marginTop: 40,
//     textAlign: 'center',
//     fontSize: 24,
//     color: '#fff',
//   },
//   label: {
//     fontSize: 18,
//     color: '#fff',
//     marginBottom: 10,
//   },
//   input: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   button: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 80,
//     backgroundColor: '#ECE653',
//     padding: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 18,
//     marginLeft: 10,
//   },
// });


// import React, { useState, useContext } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from '../contexts/auth';
// import { AntDesign } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker'; // Importa o DatePicker

// export function AddTask({ navigation }) {
//   const { user } = useContext(AuthContext);

//   // Estados para armazenar os valores da tarefa
//   const [taskName, setTaskName] = useState('');
//   const [taskDate, setTaskDate] = useState(new Date()); // Inicia com a data atual
//   const [taskDetails, setTaskDetails] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar o DatePicker

//   // Função para adicionar a nova tarefa
//   async function handleAddTask() {
//     if (!taskName || !taskDetails) {
//       Alert.alert('Por favor, preencha todos os campos');
//       return;
//     }

//     try {
//       const storedTasks = await AsyncStorage.getItem(`tasks_${user?.email}`);
//       const tasks = storedTasks ? JSON.parse(storedTasks) : [];

//       const newTask = {
//         id: Date.now().toString(),
//         name: taskName,
//         date: taskDate.toLocaleDateString(), // Formata a data para string
//         details: taskDetails,
//         status: 'open', // Status inicial é em aberto
//         isFavorite: false,
//       };

//       const updatedTasks = [...tasks, newTask];
//       await AsyncStorage.setItem(`tasks_${user?.email}`, JSON.stringify(updatedTasks));

//       Alert.alert('Tarefa adicionada com sucesso');
      
//       // Passando a nova tarefa de volta para a Home
//       navigation.navigate('Home', { newTask });
//     } catch (error) {
//       Alert.alert('Erro ao adicionar a tarefa');
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.Title}>Criar Tarefa</Text>
//       <Text style={styles.label}>Nome da Tarefa</Text>
//       <TextInput
//         style={styles.input}
//         value={taskName}
//         onChangeText={setTaskName}
//         placeholder="Digite o nome da tarefa"
//       />

//       <Text style={styles.label}>Data</Text>
//       <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
//         <Text>{taskDate.toLocaleDateString()}</Text> {/* Mostra a data formatada */}
//       </TouchableOpacity>

//       {showDatePicker && (
//         <DateTimePicker
//           value={taskDate}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             const currentDate = selectedDate || taskDate;
//             setShowDatePicker(false);
//             setTaskDate(currentDate);
//           }}
//         />
//       )}

//       <Text style={styles.label}>Detalhes</Text>
//       <TextInput
//         style={styles.input}
//         value={taskDetails}
//         onChangeText={setTaskDetails}
//         placeholder="Digite os detalhes da tarefa"
//       />

//       <TouchableOpacity style={styles.button} onPress={handleAddTask}>
//         <AntDesign name="checkcircle" size={24} color="white" />
//         <Text style={styles.buttonText}>Adicionar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#292929',
//   },
//   Title: {
//     marginTop: 40,
//     textAlign: 'center',
//     fontSize: 24,
//     color: '#fff',
//   },
//   label: {
//     fontSize: 18,
//     color: '#fff',
//     marginBottom: 10,
//   },
//   input: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   button: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 80,
//     backgroundColor: '#ECE653',
//     padding: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 18,
//     marginLeft: 10,
//   },
// });


//V1
// //NOVO (Funcionando)
// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from '../contexts/auth';
// import { AntDesign } from '@expo/vector-icons';

// export function AddTask({ navigation }) {
//   const { user } = useContext(AuthContext);

//   // Estados para armazenar os valores da tarefa
//   const [taskName, setTaskName] = useState('');
//   const [taskDate, setTaskDate] = useState('');
//   const [taskDetails, setTaskDetails] = useState('');

//   // Função para adicionar a nova tarefa
//   async function handleAddTask() {
//     if (!taskName || !taskDate || !taskDetails) {
//       Alert.alert('Por favor, preencha todos os campos');
//       return;
//     }
  
//     try {
//       const storedTasks = await AsyncStorage.getItem(`tasks_${user?.email}`);
//       const tasks = storedTasks ? JSON.parse(storedTasks) : [];
  
//       const newTask = {
//         id: Date.now().toString(),
//         name: taskName,
//         date: taskDate,
//         details: taskDetails,
//         status: 'open', // Status inicial é em aberto
//         isFavorite: false,
//       };
  
//       const updatedTasks = [...tasks, newTask];
//       await AsyncStorage.setItem(`tasks_${user?.email}`, JSON.stringify(updatedTasks));
  
//       Alert.alert('Tarefa adicionada com sucesso');
      
//       // Passando a nova tarefa de volta para a Home
//       navigation.navigate('Home', { newTask });
//     } catch (error) {
//       Alert.alert('Erro ao adicionar a tarefa');
//     }
//   }
  

//   return (
//     <View style={styles.container}>
//         <Text style={styles.Title}>Criar Tarefa</Text>
//       <Text style={styles.label}>Nome da Tarefa</Text>
//       <TextInput
//         style={styles.input}
//         value={taskName}
//         onChangeText={setTaskName}
//         placeholder="Digite o nome da tarefa"
//       />

//       <Text style={styles.label}>Data</Text>
//       <TextInput
//         style={styles.input}
//         value={taskDate}
//         onChangeText={setTaskDate}
//         placeholder="Digite a data da tarefa"
//       />

//       <Text style={styles.label}>Detalhes</Text>
//       <TextInput
//         style={styles.input}
//         value={taskDetails}
//         onChangeText={setTaskDetails}
//         placeholder="Digite os detalhes da tarefa"
//       />

//       <TouchableOpacity style={styles.button} onPress={handleAddTask}>
//         <AntDesign name="checkcircle" size={24} color="white" />
//         <Text style={styles.buttonText}>Adicionar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#292929',
//   },
//   Title: {
//     marginTop:40,
//     textAlign:'center',
//     fontSize: 24,
//     color: '#fff',
//   },
//   label: {
//     fontSize: 18,
//     color: '#fff',
//     marginBottom: 10,
//   },
//   input: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   button: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 80,
//     backgroundColor: '#ECE653',
//     padding: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 18,
//     marginLeft: 10,
//   },
// });
