import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes/Routes'; 

import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style="auto"/>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}