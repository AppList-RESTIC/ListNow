import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const FaqItem = ({ question, answer }) => (
  <View style={styles.faqItem}>
    <Text style={styles.question}>{question}</Text>
    <Text style={styles.answer}>{answer}</Text>
  </View>
);

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Como podemos ajudar ?</Text>
    <AntDesign name="questioncircleo" size={128} color="white" />
  </View>
);

export function Help() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.FaqDiv}>
        <ScrollView style={styles.content}>
          <Text style={styles.subTitle}>
            <View style={styles.iconContainer}>
              <AntDesign name="questioncircleo" size={24} color="red" />
            </View>
            Dúvidas Frequentes
          </Text>

          <FaqItem 
            question="Como adicionar uma nova tarefa?" 
            answer="Para adicionar uma nova tarefa, vá até a tela inicial e toque no botão '+' localizado no canto inferior direito da tela. Preencha as informações da tarefa e toque em 'Adicionar'." 
          />
          
          <FaqItem 
            question="Como editar uma tarefa existente?" 
            answer="Para editar uma tarefa, encontre a tarefa na lista e toque no ícone de lápis ao lado da tarefa que deseja editar. Faça as alterações necessárias e salve." 
          />
          
          <FaqItem 
            question="Como excluir uma tarefa?" 
            answer="Para excluir uma tarefa, toque no ícone de lixeira ao lado da tarefa que deseja remover. Confirme a exclusão quando solicitado." 
          />
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => alert('Curtir/Descurtir pressionado')}>
          <AntDesign name="like2" size={32} color="green" />
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity onPress={() => alert('Alerta pressionado')}>
          <AntDesign name="exclamationcircleo" size={32} color="red" />
        </TouchableOpacity>
      </View>
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  FaqDiv: {
    flex: 1,
    marginTop: "30%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: "flex-start",
    alignItems: "baseline",
    flexDirection: "column",
    backgroundColor: "white",
  },
  content: {
    flex: 1,
  },
  subTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "red",
    marginTop: 24,
    marginBottom: 10,
    fontWeight: "600",
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  space: {
    width: 10,
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#292929",
  },
  answer: {
    fontSize: 14,
    color: "#292929",
    marginTop: 5,
  },
  iconContainer: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 4,
    marginRight: 8,
    display: 'inline-block', // Para o alinhamento correto
  },
});
