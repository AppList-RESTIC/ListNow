import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/auth';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export function AddTask({ navigation }) {
  const { user } = useContext(AuthContext);

  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [isNotified, setIsNotified] = useState(false); // Estado para a notificação
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para categoria selecionada

  async function handleAddTask() {
    if (!taskName || !taskDate || !taskDetails || !selectedCategory) {
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
        category: selectedCategory,
        isNotified, // Adiciona o estado de notificação
        status: 'open',
        isFavorite: false,
      };

      const updatedTasks = [...tasks, newTask];
      await AsyncStorage.setItem(`tasks_${user?.email}`, JSON.stringify(updatedTasks));

      Alert.alert('Tarefa adicionada com sucesso');
      navigation.navigate('Home', { newTask });
    } catch (error) {
      Alert.alert('Erro ao adicionar a tarefa');
    }
  }

  const handleDateChange = (text) => {
    const formattedDate = text
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');

    setTaskDate(formattedDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Criar Tarefa</Text>
      </View>

      <Text style={styles.label}>Nome da Tarefa</Text>
      <TextInput
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Ex: Jogar Bola"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Definir Data</Text>
      <TextInput
        style={styles.input}
        value={taskDate}
        onChangeText={handleDateChange}
        placeholder="30/07/2024"
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Detalhes</Text>
      <TextInput
        style={styles.input}
        value={taskDetails}
        onChangeText={setTaskDetails}
        placeholder="Ex: Vamos estar jogando pela tarde"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Categorias:</Text>
      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === 'esporte' && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory('esporte')}
        >
          <MaterialCommunityIcons name="weight-lifter" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === 'social' && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory('social')}
        >
          <AntDesign name="user" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === 'evento' && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory('evento')}
        >
          <MaterialCommunityIcons name="calendar" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === 'outros' && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory('outros')}
        >
          <AntDesign name="ellipsis1" size={24} color="white" />
        </TouchableOpacity>
      </View>
        <View style={styles.noficacaoDiv} >
      <Text style={styles.label}>Notificação:</Text>
      <TouchableOpacity style={styles.notificationButton} onPress={() => setIsNotified(!isNotified)}>
        {isNotified && <MaterialCommunityIcons name="check" size={20} color="white" />}
      </TouchableOpacity>
      </View>
      

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Adicionar</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  noficacaoDiv:{
    display:'flex',
    justifyContent: 'center',
    alignItems:'center'
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#4A4A4A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategory: {
    backgroundColor: '#ECE653',
  },
  notificationButton: {
    backgroundColor: '#4A4A4A',
    width: 40,
    height: 40,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ECE653',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
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
