import React, {useState, useContext} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from "react-native";

import { AuthContext } from "../contexts/auth";

export function Login(){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {login} = useContext(AuthContext);

  function logar(){
    login(email, senha);
  }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}> Informe seus dados</Text>
            <View style={styles.menu}>
              <View style={styles.inputGroup}>
                <TextInput 
                value={email}
                onChangeText={(e) => setEmail(e)}
                placeholder="E-mail"
                style={styles.campo}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput 
                value={senha}
                onChangeText={(e) => setSenha(e)}
                placeholder="Senha"
                style={styles.campo}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={() => logar()}>
                <Text style={styles.buttonText}>Entrar ➡️</Text>
              </TouchableOpacity>
              <Text style={styles.rocket}>🚀</Text>
            </View>
        </SafeAreaView>
    )   
}

const styles = StyleSheet.create ({
    container:{
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#f8f8f8',
      paddingTop: 164,
    },
    titulo:{
      color: '#324e7b',
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 32,
      paddingHorizontal: 32,
      textAlign: 'left',
    },
    menu:{
      flex: 1,
      width: '100%',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      justifyContent: 'flex-start',
      flexDirection: 'column',
      backgroundColor: '#324e7b',
      padding: 32
    },
    button :{
      backgroundColor: '#f8f8f8',
      alignItems: 'center',
      padding: 16,
      borderRadius: 24,
    },
    buttonText:{
      color: '#5068a9',
      fontSize: 18
    },
    inputGroup:{
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 16,
      padding: 8,
      backgroundColor: '#86a6df',
      borderWidth: 2,
      borderRadius: 16,
      borderColor: '#86a6df',
  },
  campo:{
    fontSize: 18,
    color: '#324e7b',
  },  
  rocket:{
    textAlign: 'center',
    width: '100%',
    fontSize: 64,
    padding: 32
  }
});
