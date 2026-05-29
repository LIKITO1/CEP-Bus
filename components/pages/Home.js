import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
import {styles} from "../styles/homeStyles"
import {useState} from "react"
import NotificationIcon from "../icons/NotificationIcon"
import { View,Text,TextInput ,Pressable,ScrollView} from "react-native"
import { buscarEnd,buscarCep } from "../../services/viacep"
import { buscarCoordenadas } from "../../services/geocode"
import { useNavigation } from "@react-navigation/native"
import CepIcon from "../icons/CepIcon"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LinearGradient } from "expo-linear-gradient"
import ArrowDownIcon from "../icons/ArrowDownIcon"
export default function Home(){
  const [nameUser,setNameUser]=useState("Admin")
  const [cep,setCep]=useState("")
  const [coords,setCoords]=useState(null)
  const navigation=useNavigation()
  const [selected,setSelected]=useState("CEP")
  const [openList,setOpenList]=useState(false)
  const [estadoSelecionado,setEstadoSelecionado]=useState("SP")
  const [rua,setRua]=useState("")
  const [cidade,setCidade]=useState("")
  const [baixo,setBaixo]=useState(true)
  const estados = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]
  function mostrarList(){
    if(openList){
      setOpenList(false)
      setBaixo(true)
    }else{
      setOpenList(true)
      setBaixo(false)
    }
  }
  function selecionar(){
    if(selected=="CEP"){
      setSelected("END")
    }else{
      setSelected("CEP")
    }
  }
  function digitar(e){
    const numeros=e.replace(/[^0-9]/g,"")
    setCep(numeros)
  }
  async function buscaEnd(){
    if(rua==""||cidade==""){
      console.log("Preencha todos os campos")
      return;
    }
    try{
      const res=await buscarCep(estadoSelecionado,cidade,rua)
      console.log(res)
    }catch(err){

    }
  }
  async function buscaCep(){
    try{
      const res=await buscarEnd(cep)
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
    <View style={[globalStyles.container,styles.container]}>
      <View style={styles.containerOne}>
        <View>
          <Text style={styles.text}>Olá, {nameUser}!</Text>
          <Text style={styles.subtext}>Encontre o ônibus mais próximo de você</Text>
        </View>
        <NotificationIcon/>
      </View>
      <View>
        <Text style={[styles.text,styles.titleSearch,globalStyles.centro]}>Opções de Busca:</Text>
        <View style={[styles.search,globalStyles.centro]}>
          <Pressable style={[styles.btnSearch,selected=="CEP"?styles.selected:"",globalStyles.centro]} onPress={selecionar}>
            <Text style={styles.textBtnSearch}>Por CEP</Text>
          </Pressable>
          <Pressable style={[styles.btnSearch,selected=="END"?styles.selected:"",globalStyles.centro]} onPress={selecionar}>
            <Text style={styles.textBtnSearch}>Por Endereço</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.containerTwo}>
      <ScrollView contentContainerStyle={globalStyles.centro}>
        <CepIcon/>
        {selected=="CEP"&&(
          <View style={[globalStyles.centro,{gap:10}]}>
            <Text style={styles.text}>Informe o CEP</Text>
            <Text style={styles.subtext}>Vamos mostrar os pontos de ônibus próximos</Text>
            <TextInput style={styles.entrada} keyboardType="numeric" onChangeText={digitar} value={cep} placeholder="Digite o CEP..."/>
            <Pressable onPress={buscaCep}>
              <LinearGradient colors={['#4843F5','#0086E8']} start={{x:0,y:1}} style={styles.btnMap}>
                <Text style={styles.textBtnMap}>Mostrar no mapa</Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}
        {selected=="END"&&(
          <View style={styles.infoEnd}>
            <Text style={styles.text}>Informe o Endereço</Text>
            <Text style={styles.subtext}>Vamos mostrar os pontos de ônibus próximos</Text>
            <Text style={[styles.label,{marginVertical:10}]}>Selecione o estado:</Text>
            <Pressable onPress={mostrarList}>
              <Text style={[styles.estado,styles.estadoSelecionado]}>{estadoSelecionado}</Text>
              <ArrowDownIcon style={baixo?{transform:[{rotate:'0deg'}]}:{transform:[{rotate:'180deg'}]}}/>
            </Pressable>
              {openList&&(
                <ScrollView style={styles.list}>
                  {estados.map((valor)=>(
                    <Text key={valor} style={styles.estado} onPress={()=>{
                      setEstadoSelecionado(valor)
                      setOpenList(false)
                      setBaixo(true)
                    }}>{valor}</Text>
                  ))}
                </ScrollView>
              )}
            <View>
              <Text style={styles.label}>Cidade:</Text>
              <Text style={styles.after}>*</Text>
            </View>
            <TextInput placeholder="Digite a cidade..." style={styles.entrada} value={cidade} onChangeText={setCidade}/>
            <View>
              <Text style={styles.label}>Rua:</Text>
              <Text style={styles.after}>*</Text>
            </View>
            <TextInput placeholder="Digite a rua..." style={styles.entrada} value={rua} onChangeText={setRua}/>
            <Pressable onPress={buscaEnd}>
              <LinearGradient colors={['#4843F5','#0086E8']} start={{x:0,y:1}} style={styles.btnMap}>
                <Text style={styles.textBtnMap}>Mostrar no mapa</Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}
      </ScrollView>
      </View>
      <Menu/>
    </View>
  )
}