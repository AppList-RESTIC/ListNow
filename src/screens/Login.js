import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import { AntDesign } from "@expo/vector-icons"; // Pacote de ícones do Expo

import { AuthContext } from "../contexts/auth";

export function Login() {
  const { login } = useContext(AuthContext);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("⚠️ Insira um e-mail válido.")
      .required("⚠️ Campo e-mail não pode ser vazio."),
    senha: yup
      .string()
      .min(6, "⚠️ A senha deve ter no mínimo 6 caracteres.")
      .required("⚠️ Campo senha não	pode ser vazio."),
  });

  function logar(email, senha) {
    login(email, senha);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}> Informe seus dados</Text>
      <Formik
        initialValues={{ email: "", senha: "" }}
        validateOnMount={true}
        onSubmit={(values) => logar(values.email, values.senha)}
        validationSchema={loginValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <View style={styles.menu}>
            {errors.email && touched.email && (
              <Text style={styles.textErrors}>{errors.email}</Text>
            )}

            <View style={styles.form}>

            <View style={styles.inputGroup}>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="E-mail"
                style={styles.campo}
                /> 
              <AntDesign name="user" size={28} color="#A5A5A5" style={styles.icon} />
            </View>

            {errors.senha && touched.senha && (
              <Text style={styles.textErrors}>{errors.senha}</Text>
            )}
            <View style={styles.inputGroup}>
              <TextInput
                onChangeText={handleChange("senha")}
                onBlur={handleBlur("senha")}
                value={values.senha}
                placeholder="Senha"
                style={styles.campo}
              />
              <AntDesign name="mail" size={28} color="#A5A5A5" style={styles.icon} />
            </View>
                </View>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isValid ? "#ECE653" : "#ECE653",
                },
              ]}
              onPress={handleSubmit}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Entrar</Text>
                <AntDesign
                  name="arrowright"
                  size={28}
                  color="black"
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>

            <Text onPress={() => logar(null, null)} style={styles.buttonPular}>
              Pular
            </Text>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#292929",
    paddingTop: '5%',
  },
  titulo: {
    color: "#ffff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    paddingHorizontal: 32,
    textAlign: "center",
  },
  menu: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: "#292929",
    padding: 32,
  },
  button: {
    alignItems: "center",
    padding: 16,
    marginTop: 24,
    borderRadius: 24,
    borderWidth: 2,
    color: "#ECE653",
  },
  buttonText: {
    fontWeight: "600",
    color: "black",
    fontSize: 24,
  },

  buttonPular: {
    textAlign: "center",
    marginTop: 36,
    color: "white",
    fontSize: 24,
  },

  buttonContent: {
    flexDirection: "row", // Mantém o texto e o ícone na mesma linha
    justifyContent: "center",
    gap: 24,
    alignItems: "center", // Centraliza verticalmente
    width: "100%", // Para garantir que ocupe toda a largura do botão
  },

  form:{
    marginTop: '2.5em',
    gap:86,
    marginBottom: 120,
  },

  inputGroup: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent:'space-between',
    marginBottom: '0.525em',
    padding: 8,
    borderColor: "#A5A5A5",
    backgroundColor: "transparent",
    borderBottomWidth: 2, // Apenas o sublinhado
    borderBottomColor: "#A5A5A5", // Cor do sublinhado
    paddingBottom: 4, // Para adicionar espaço entre o texto e o sublinhado

  },
  campo: {
    fontSize: 18,
    color: "#A5A5A5",
    backgroundColor: "transparent", // Fundo transparente
    paddingVertical: 4, // Para espaço em cima e embaixo
    paddingLeft: 8, // Espaço à esquerda para o texto
  },
  rocket: {
    textAlign: "center",
    width: "100%",
    fontSize: 64,
    padding: 32,
  },
  textErrors: {
    fontSize: 14,
    color: "#fff",
    padding: 4,
    borderBottomWidth: 2,
    borderBottomColor: "#AA1122",
    marginBottom: 4,
  },
});

