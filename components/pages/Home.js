import {View,Text} from "react-native"
import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
import {styles} from "../styles/homeStyles"
import {useState} from "react"
import NotificationIcon from "../icons/NotificationIcon"
import { Button, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { buscarCep } from "../../services/viacep"
import { buscarCoordenadas } from "../../services/geocode"
import { useNavigation } from "@react-navigation/native"
import CepIcon from "../icons/CepIcon"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function Home(){
  const [nameUser,setNameUser]=useState("Admin")
  const [cep,setCep]=useState("")
  const [coords,setCoords]=useState(null)
  const navigation=useNavigation()
  function digitar(e){
    const numeros=e.replace(/[^0-9]/g,"")
    setCep(numeros)
  }
  async function buscaCep(){
    try{
      const res=await buscarCep(cep)
      const historico=await AsyncStorage.getItem("historico")
      if(historico==null){
        await AsyncStorage.setItem("historico",JSON.stringify([cep]))
      }else{
        const novoHistorico=JSON.parse(historico)
        novoHistorico.push(cep)
        await AsyncStorage.setItem("historico",JSON.stringify(novoHistorico))
      }
      const enderecoCompleto=res.logradouro+" "+res.localidade+" "+res.uf
      const coordenadas=await buscarCoordenadas(enderecoCompleto)
      const latitude=coordenadas[0].lat
      const longitude=coordenadas[0].lon
      setCoords({
        latitude:String(latitude),
        longitude:String(longitude)
      })
      navigation.navigate("Map",{latitude,longitude})
  }catch(err){
    console.log("Erro:"+err)
  }
  }
  return(
    <SafeAreaView style={{flex:1}}>
    <View style={[globalStyles.container,styles.container]}>
      <View style={styles.containerOne}>
        <View>
          <Text style={styles.text}>Olá, {nameUser}!</Text>
          <Text style={styles.subtext}>Encontre o ônibus mais próximo de você</Text>
        </View>
        <NotificationIcon/>
      </View>
      <View style={styles.containerTwo}>
        <CepIcon/>
        <Text style={styles.text}>Informe o CEP</Text>
        <Text style={styles.subtext}>Vamos mostrar os pontos de ônibus próximos</Text>
        <TextInput style={styles.entrada} keyboardType="numeric" onChangeText={digitar} value={cep} placeholder="Digite o CEP..."/>
        <Button title='Mostrar no mapa' onPress={buscaCep}/>
      </View>
      <Menu/>
    </View>
    </SafeAreaView>
  )
}