import {View,TextInput,Text,TouchableOpacity} from "react-native"
import {useNavigation} from '@react-navigation/native'
import {styles} from "../styles/cadastroStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import PersonIcon from "../icons/PersonIcon"
import LockIcon from "../icons/LockIcon"
import {useState} from "react"
import OpenEyeIcon from "../icons/OpenEyeIcon"
import ClosedEyeIcon from "../icons/ClosedEyeIcon"
import {LinearGradient} from "expo-linear-gradient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { globalStyles } from "../styles/globalStyles"
import ErrorMsg from "../layouts/ErrorMsg"
export default function Cadastro() {
  const navigation=useNavigation()
  const [mostrarSenha,setMostrarSenha]=useState(false)
  const [email,setEmail]=useState("")
  const [senha,setSenha]=useState("")
  const [msg,setMsg]=useState("")
  const [keyMsg,setKeyMsg]=useState(0)
  async function cadastrar(){
    const emailArm=await AsyncStorage.getItem("email")
    if(email!=""&&senha!=""){
    if((emailArm&&emailArm==email)||email=="admin@gmail.com"){
        setMsg("Este email já esta sendo utilizado")
        setKeyMsg((e)=>e+1)
    }else{
        if(email.includes("@gmail.com")||email.includes("@outlook.com")||email.includes("@faacgedu.org.br")){
            if(senha.length>3){
                await AsyncStorage.setItem("email",email)
                await AsyncStorage.setItem("senha",senha)
                navigation.navigate("Home")
            }else{
                setMsg("Sua senha deve possuir mais de 3 caracteres")
                setKeyMsg((e)=>e+1)
            }
        }else{
            setMsg("Email inválido")
            setKeyMsg((e)=>e+1)
        }
    }
  }else{
    setMsg("Preencha todos os campos")
    setKeyMsg((e)=>e+1)
  }
}
  function verSenha(){
    if(mostrarSenha){
      setMostrarSenha(false)
    }else{
      setMostrarSenha(true)
    }
  }
  function redirectLogar(){
    navigation.navigate("Login")
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <View style={[styles.form,globalStyles.centro]}>
        <Text style={styles.titulo}>Seja Bem Vindo</Text>
        <Text style={styles.subtext}>Realize o cadastro para acessar a plataforma</Text>
        <View style={styles.dados}>
          <TextInput placeholder="Digite seu email..." keyboardType="email-address" style={styles.textInput} onChangeText={setEmail}/>
          <PersonIcon styles={styles.iconPerson}/>
        </View>
        <View style={styles.dados}>
          <TextInput placeholder="Digite sua senha..." secureTextEntry={!mostrarSenha} style={styles.textInput} onChangeText={setSenha}/>
          <LockIcon styles={styles.iconLock}/>
          {mostrarSenha ? (
              <OpenEyeIcon styles={styles.eye} onPress={verSenha}/>
          ) : null}
          {!mostrarSenha&&(
              <ClosedEyeIcon styles={styles.eye} onPress={verSenha}/>
          )}
        </View>
        <TouchableOpacity onPress={cadastrar} style={{width:'80%'}}>
          <LinearGradient colors={['#4843F5','#51CAF3']} start={{x:0,y:1}} style={{borderRadius:10,marginTop:10}}>
            <Text style={styles.btnLogin}>Cadastrar</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{width:'100%'}}>
          <Text style={styles.btnConta} onPress={redirectLogar}>Já tem conta?<Text style={{color:'blue',fontWeight:600}}> Efetuar login</Text></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.baixo}>
        <Text style={styles.titulo}>Roteiro perfeito</Text>
        <Text>Encontre paradas próximas e chegue no horário certo</Text>
      </View>
    </View>
    {msg&&(
      <ErrorMsg key={keyMsg} msg={msg}/>
    )}
    </SafeAreaView>
  );
}