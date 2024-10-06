import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native";

export function BemVindo({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.AppName}>LIST NOW</Text>

                <Image
                    source={require('../../assets/Logo.png')} // Caminho relativo para a imagem local
                    style={styles.logo}
                />

                <Text style={styles.title}>Organize sua vida com facilidade e eficiência, tudo na palma da sua mão.</Text>

                <View style={styles.setaContainer}>
                    <Image
                        source={require('../../assets/seta.png')}
                        style={styles.seta}
                    />
                </View>

                <TouchableOpacity
                    style={styles.startBtn}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.btnText}>Começe Aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '10%',
        flex: 1,
        backgroundColor: '#292929',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        alignItems: 'center',      // Alinha os itens dentro da View centralizada
    },


    AppName: {
        fontSize: 32,
        marginBottom: '5%',
        color: 'white',
        textAlign: "center",
    },
    title: {
        fontSize: 28,
        width: '90%',
        marginBottom: 20,
        marginTop: 46,
        color: 'white',
        textAlign: "center"
    },
    logo: {
        width: 200,  // Largura da imagem
        height: '8em', // Altura da imagem
        resizeMode: 'contain',  // Ajusta a imagem dentro do tamanho definido
        marginTop: 38,
    },
    setaContainer: {
        width: '100%',          // A largura do container será 100% da tela
        alignItems: 'flex-start', // Alinha a seta à esquerda (flex-start)
        paddingLeft: 20,        // Espaçamento da borda esquerda
    },
    startBtn: {
        width: '60%',
        padding: 16,
        marginTop: '0.625rem',
        borderRadius: 24,
        borderWidth: 2,
        backgroundColor: '#ECE653',
        alignItems: 'center'
    },
    btnText: {
        color: "black", // Cor do texto
        fontSize: 20,
        fontWeight: "bold"
    },
});
