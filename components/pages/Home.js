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
import { distancia } from "../../services/distancia"
import { buscarClima } from "../../services/weather"
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
    const res=await buscarCep(cep)
    const enderecoCompleto=res.logradouro+" "+res.localidade+" "+res.uf
    const coordenadas=await buscarCoordenadas(enderecoCompleto)
    const latitude=coordenadas[0].lat
    const longitude=coordenadas[0].lon
    setCoords({
      latitude:String(latitude),
      longitude:String(longitude)
    })
    const pontos=await distancia(latitude,longitude)
    const temp=await buscarClima(latitude,longitude)
    navigation.navigate("Map",{latitude,longitude,pontos,temperatura:temp})
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
        <Text style={styles.text}>Informe o CEP</Text>
        <Text style={styles.subtext}>Vamos mostrar os pontos de ônibus próximos</Text>
        <TextInput style={styles.entrada} keyboardType="numeric" onChangeText={digitar} value={cep}/>
        <Button title='Mostrar no mapa' onPress={buscaCep}/>
      </View>
      <View>
        <Text style={styles.text}>Pesquisas recentes:</Text>
      </View>
      <Menu/>
    </View>
    </SafeAreaView>
  )
}