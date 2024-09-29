import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';

import { AuthContext } from "../contexts/auth";

export function Login() {

  const { login } = useContext(AuthContext);

  const loginValidationSchema = yup.object().shape({
    email: yup.string().email('⚠️ Insira um e-mail válido.').required('⚠️ Campo e-mail não pode ser vazio.'),
    senha: yup.string().min(6, '⚠️ A senha deve ter no mínimo 6 caracteres.').required('⚠️ Campo senha não	pode ser vazio.')
  });

  function logar(email, senha) {
    login(email, senha);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}> Informe seus dados</Text>
      <Formik
        initialValues={{ email: '', senha: '' }}
        validateOnMount={true}
        onSubmit={values => logar(values.email, values.senha)}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <View style={styles.menu}>
            {errors.email && touched.email &&
              <Text style={styles.textErrors}>{errors.email}</Text>
            }
            <View style={styles.inputGroup}>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="E-mail"
                style={styles.campo}
              />
            </View>

            {errors.senha && touched.senha &&
              <Text style={styles.textErrors}>{errors.senha}</Text>
            }
            <View style={styles.inputGroup}>
              <TextInput
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
                placeholder="Senha"
                style={styles.campo}
              />
            </View>

            <TouchableOpacity style={[styles.button, {
              backgroundColor: isValid ? '#ECE653' : '#ECE653',
              borderColor: isValid ? '#86a6df' : '#a9a9a9'
            }]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Entrar ➡️</Text>
            </TouchableOpacity>


            <TouchableOpacity 
            style={[styles.button, { borderColor: isValid ? '#86a6df' : '#a9a9a9' }]} 
            onPress={() => logar(null, null)}>
            <Text style={styles.buttonText}>Pular</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={[styles.button, {
          
              borderColor: isValid ? '#86a6df' : '#a9a9a9'
            }]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Pular</Text>
            </TouchableOpacity> */}

            <Text style={styles.rocket}>🚀</Text>

          </View>
        )}
      </Formik>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#292929',
    paddingTop: 164,
  },
  titulo: {
    color: '#ffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    paddingHorizontal: 32,
    textAlign: 'center',
  },
  menu: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#292929',
    padding: 32
  },
  button: {
    alignItems: 'center',
    padding: 16,
    marginTop:24,
    borderRadius: 24,
    borderWidth: 2,
    color: '#ECE653'
  },
  buttonText: {
    color: '#5068a9',
    fontSize: 18
  },
  inputGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#86a6df',
  },
  campo: {
    fontSize: 18,
    color: '#324e7b',
  },
  rocket: {
    textAlign: 'center',
    width: '100%',
    fontSize: 64,
    padding: 32
  },
  textErrors: {
    fontSize: 14,
    color: '#fff',
    padding: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#AA1122',
    marginBottom: 4
  }
});
