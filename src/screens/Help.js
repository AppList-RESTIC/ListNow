import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Pressable, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const FaqItem = ({ question, answer }) => (
  <View style={styles.faqItem}>
    <Text style={styles.question}>{question}</Text>
    <Text style={styles.answer}>{answer}</Text>
  </View>
);

const Header = ({ navigation }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <AntDesign name="arrowleft" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.title}>Como podemos ajudar?</Text>

    <View style={styles.imgContainer}>
      <AntDesign name="questioncircleo" size={128} color="white" />
    </View>
  </View>
);

export function Help() {
  const navigation = useNavigation();
  
  // Estado para controlar os modais
  const [likeModalVisible, setLikeModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false); // Novo estado para o modal de feedback
  const [inputText, setInputText] = useState(""); // Estado para o texto do input

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

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

          {/* Botões de ação */}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => setFeedbackModalVisible(true)}>
              <AntDesign name="like2" size={32} color="#000" />
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity onPress={() => setAlertModalVisible(true)}>
              <AntDesign name="exclamationcircleo" size={32} color="red" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Modal para "Curtir/Descurtir" */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={feedbackModalVisible}
        onRequestClose={() => setFeedbackModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.feedbackModalView}>
            <Text style={styles.modalText}>Você gostou?</Text>
            <View style={styles.feedbackButtons}>
              <TouchableOpacity onPress={() => { console.log('Gostei'); setFeedbackModalVisible(false); }}>
                <AntDesign name="like1" size={32} color="#000" />
              </TouchableOpacity>
              <View style={styles.space} />
              <TouchableOpacity onPress={() => { console.log('Não gostei'); setFeedbackModalVisible(false); }}>
                <AntDesign name="dislike1" size={32} color="#000" />
              </TouchableOpacity>
            </View>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setFeedbackModalVisible(false)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal para "Alerta" */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={alertModalVisible}
        onRequestClose={() => setAlertModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Informe algo aqui:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu alerta"
              placeholderTextColor="#A5A5A5"
              value={inputText}
              onChangeText={setInputText}
            />
            <Pressable
              style={styles.buttonSend}
              onPress={() => {
                console.log(inputText); // Ação para enviar o alerta
                setAlertModalVisible(false); // Fecha o modal
              }}
            >
              <Text style={styles.textButton}>Enviar</Text>
            </Pressable>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setAlertModalVisible(false)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
    textAlign: 'center',
    fontWeight: "bold",
    marginBottom: 20,
  },
  imgContainer: {
    marginTop: 10,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  FaqDiv: {
    flex: 1,
    marginTop: "5%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: "flex-start",
    alignItems: "center",
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
    justifyContent: 'space-between',
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
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Fundo escuro para dar foco ao modal
  },
  feedbackModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: '80%',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonClose: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: "#f44336",
  },
  buttonSend: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4CAF50",
    marginBottom: 10,
    width: '80%',
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  textButton: {
    color: "white",
    textAlign: "center",
  },
});
