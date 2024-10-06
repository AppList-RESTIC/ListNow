import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export function TaskItem({ task, onFavorite, onDelete }) {
  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskName}>{task.name}</Text>
        <Text style={styles.taskDate}>Data: {task.date}</Text>
        <Text style={styles.taskDetails}>{task.details}</Text>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity onPress={() => onFavorite(task.id)}>
          <AntDesign name={task.isFavorite ? "star" : "staro"} size={24} color="#FFD700" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <AntDesign name="delete" size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  taskInfo: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDate: {
    fontSize: 14,
    color: '#777',
  },
  taskDetails: {
    fontSize: 16,
    marginTop: 5,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
