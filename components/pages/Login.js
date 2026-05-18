import {View,TextInput,Text,Button} from "react-native"
import {useNavigation} from '@react-navigation/native'
import {styles} from "../styles/loginStyles"
export default function Login() {
  const navigation=useNavigation()
  function home(){
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.titulo}>Bem-Vindo de Volta</Text>
        <Text>Faça login para continuar</Text>
        <TextInput placeholder="Email ou telefone" style={styles.text}/>
        <TextInput placeholder="Senha" style={styles.text}/>
        <View style={styles.linha}>
          <Text>Lembrar-me</Text>
          <Text>Esqueceu a senha?</Text>
        </View>
        <Button title="Fazer Login" onPress={home}/>
        <Button title="Não tem conta?Cadastra-se"/>
      </View>
      <View style={styles.baixo}>
        <Text style={styles.titulo}>Roteiro perfeito</Text>
        <Text>Encontre paradas próximas e chegue no horário certo</Text>
      </View>
    </View>
  );
}