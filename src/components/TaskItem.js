import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; // Ícones do Expo

export function TaskItem({ task, onFavorite, onDelete }) {
  return (
    <View style={styles.taskContainer}>
      {/* Botão de favorito */}
      <TouchableOpacity onPress={() => onFavorite(task.id)}>
        <AntDesign 
          name={task.isFavorite ? 'star' : 'staro'} 
          size={24} 
          color={task.isFavorite ? '#FFD700' : '#aaa'} 
        />
      </TouchableOpacity>

      {/* Texto da tarefa */}
      <Text style={styles.taskText}>{task.text}</Text>

      {/* Botão de deletar */}
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <FontAwesome name="trash" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  taskText: {
    flex: 1,
    marginHorizontal: 16,
    fontSize: 18,
    color: '#333',
  },
});
