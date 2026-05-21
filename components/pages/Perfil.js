import {View,Text,Pressable} from "react-native"
import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
import {styles} from "../styles/perfilStyles"
import SettingIcon from "../icons/SettingIcon"
import {useState} from "react"
import { useNavigation } from "@react-navigation/native"
export default function Perfil(){
  const [username,setUsername]=useState('Lucas Oliveira')
  const [email,setEmail]=useState('lucas@gmail.com')
  const [qntLocais,setQntLocais]=useState(5)
  const [qntBuscas,setQntBuscas]=useState(12)
  const [ativa,setAtiva]=useState(true)
  const navigation=useNavigation()
  function historic(){
    navigation.navigate("Historic")
  }
  function locals(){
    navigation.navigate("Frequent")
  }
  function notification(){
    console.log("Notificação")
  }
  return (
    <View style={globalStyles.container}>
      <View style={styles.bloco1}>
        <Text style={styles.title}>Meu Perfil</Text>
        <SettingIcon/>
      </View>
      <View style={styles.informations}>
        <View style={styles.photo}>

        </View>
        <View style={styles.nameEmail}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <View style={styles.itensMenu}>
        <Pressable style={[styles.linha,{borderBottomColor:'black',borderBottomWidth:1}]} onPress={locals}>
          <Text style={styles.item}>Locais Frequentes</Text>
          <Text>{qntLocais} salvos</Text>
        </Pressable>
        <Pressable style={[styles.linha,{borderBottomColor:'black',borderBottomWidth:1}]} onPress={historic}>
          <Text style={styles.item}>Histórico de Buscas</Text>
          <Text>{qntBuscas} salvas</Text>
        </Pressable>
        <Pressable style={styles.linha} onPress={notification}>
          <Text style={styles.item}>Notificações</Text>
          <Text>{ativa?"Ativada":"Desativada"}</Text>
        </Pressable>
      </View>
    <Menu/>
    </View>
  )
}