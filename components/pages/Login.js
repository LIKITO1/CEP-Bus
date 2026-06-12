import {View,TextInput,Text,TouchableOpacity} from "react-native"
import {useNavigation} from '@react-navigation/native'
import {styles} from "../styles/loginStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import PersonIcon from "../icons/PersonIcon"
import LockIcon from "../icons/LockIcon"
import {useState} from "react"
import OpenEyeIcon from "../icons/OpenEyeIcon"
import ClosedEyeIcon from "../icons/ClosedEyeIcon"
import {LinearGradient} from "expo-linear-gradient"
import Checkbox from "expo-checkbox"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ErrorMsg from "../layouts/ErrorMsg"
import { globalStyles } from "../styles/globalStyles"
export default function Login() {
  const navigation=useNavigation()
  const [mostrarSenha,setMostrarSenha]=useState(false)
  const [email,setEmail]=useState("")
  const [senha,setSenha]=useState("")
  const [check,setCheck]=useState(false)
  const [msg,setMsg]=useState("")
  const [keyMsg,setKeyMsg]=useState(0)
  async function logar(){
    const emailArm=await AsyncStorage.getItem("email")
    const senhaArm=await AsyncStorage.getItem("senha")
    if(emailArm&&senhaArm){
      if(email==emailArm){
        if(senha==senhaArm){
          navigation.navigate("Home")
        }else{
          setMsg("Senha incorreta")
          setKeyMsg((e)=>e+1)
        }
      }
    }else{
      if(email=="admin@gmail.com"){
        if(senha=="admin"){
          navigation.navigate("Home")
        }else{
          setMsg("Senha incorreta")
          setKeyMsg((e)=>e+1)
        }
      }else{
        setMsg("Email inválido")
        setKeyMsg((e)=>e+1)
      }
    }
  }
  function verSenha(){
    if(mostrarSenha){
      setMostrarSenha(false)
    }else{
      setMostrarSenha(true)
    }
  }
  function redirectCadastro(){
    navigation.navigate("Cadastro")
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={[globalStyles.container,globalStyles.centro]}>
      {msg&&(
        <ErrorMsg msg={msg} key={keyMsg}/>
      )}
      <View style={[styles.form,globalStyles.centro]}>
        <Text style={styles.titulo}>Bem-Vindo de Volta</Text>
        <Text style={styles.subtext}>Faça login para continuar</Text>
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
        <View style={styles.linha}>
          <View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
            <Checkbox value={check} onValueChange={setCheck}/>
            <Text>Lembrar-me</Text>
          </View>
          <Text>Esqueceu a senha?</Text>
        </View>
        <TouchableOpacity onPress={logar} style={{width:'80%'}}>
          <LinearGradient colors={['#4843F5','#51CAF3']} start={{x:0,y:1}} style={{borderRadius:10,marginTop:10}}>
            <Text style={styles.btnLogin}>Fazer Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{width:'100%'}}>
          <Text style={styles.btnConta} onPress={redirectCadastro}>Não tenho conta? <Text style={{color:'blue',fontWeight:600}}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}