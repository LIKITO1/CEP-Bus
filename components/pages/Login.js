import {View,TextInput,Text,Button,StyleSheet} from "react-native"
import {useNavigation} from '@react-navigation/native'
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
const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  form:{
    width:"100%",
    height:"60%",
    borderWidth:1,
    borderColor:"black",
    borderBottomEndRadius:"30px",
    borderBottomStartRadius:"30px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    zIndex:1
  },
  baixo:{
    height:"40%",
    width:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"end"
  },
  text:{
    padding:"10px",
    borderWidth:1,
    borderColor:"black",
    width:"70%"
  },
  linha:{
    display:"flex",
    flexDirection:"row",
    gap:"30px"
  },
  titulo:{
    fontWeight:"bold",
    fontSize:"20px"
  }
});