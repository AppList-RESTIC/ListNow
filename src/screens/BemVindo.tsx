import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  // Add other screen names here
};

type BemVindoProps = {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
};

export function BemVindo({ navigation }: BemVindoProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.AppName}>LIST NOW</Text>
        
        <Image
          source={require('../../assets/Logo.png') as ImageSourcePropType}
          style={styles.logo}
        />
        
        <Text style={styles.title}>Organize sua vida com facilidade e eficiência, tudo na palma da sua mão.</Text>
        
        <View style={styles.setaContainer}>
          <Image
            source={require('../../assets/seta.png') as ImageSourcePropType}
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
    alignItems: 'center',
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
    maxWidth: '100%',
    marginBottom: 20,
    marginTop: 46,
    color: 'white',
    textAlign: "center"
  },
  logo: {
    width: 200,
    height: 128, // Converted '8em' to approximately 128px (assuming 1em = 16px)
    resizeMode: 'contain',
    marginTop: 38,
  },
  setaContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  seta: {
    // You might want to add width and height properties here
  },
  startBtn: {
    width: '60%',
    padding: 16,
    marginTop: 10, // Converted '0.625rem' to 10px
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: '#ECE653',
    alignItems: 'center'
  },
  btnText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  },
});