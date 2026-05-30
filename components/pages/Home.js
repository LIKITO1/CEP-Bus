import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
import { styles } from "../styles/homeStyles"
import {useState,useRef,useEffect} from "react"
import {View,Text,TextInput,Pressable,ScrollView,Animated,Easing} from "react-native"
import NotificationIcon from "../icons/NotificationIcon"
import CepIcon from "../icons/CepIcon"
import ArrowDownIcon from "../icons/ArrowDownIcon"
import { buscarEnd, buscarCep } from "../../services/viacep"
import { buscarCoordenadas } from "../../services/geocode"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LinearGradient } from "expo-linear-gradient"
export default function Home() {
  const navigation = useNavigation()
  const [nameUser] = useState("Admin")
  const [cep, setCep] = useState("")
  const [coords, setCoords] = useState(null)
  const [selected, setSelected] = useState("CEP")
  const [openList, setOpenList] = useState(false)
  const [estadoSelecionado, setEstadoSelecionado] = useState("SP")
  const [rua, setRua] = useState("")
  const [cidade, setCidade] = useState("")
  const estados = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]
useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(floatAnim,{
        toValue:-2,
        duration:3000,
        easing:Easing.inOut(Easing.ease),
        useNativeDriver:true
      }),
      Animated.timing(floatAnim,{
        toValue:0,
        duration:3000,
        easing:Easing.inOut(Easing.ease),
        useNativeDriver:true
      })
    ])
  ).start()
},[])
  const slideAnim = useRef(new Animated.Value(0)).current
  const floatAnim = useRef(new Animated.Value(0)).current
  const scaleCep = useRef(new Animated.Value(1)).current
  const scaleEnd = useRef(new Animated.Value(1)).current
  useEffect(() => {
    Animated.spring(slideAnim,{
      toValue:selected === "CEP" ? 0 : 1,
      useNativeDriver:false
    }).start()
  },[selected])
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim,{
          toValue:-6,
          duration:2500,
          useNativeDriver:true
        }),
        Animated.timing(floatAnim,{
          toValue:0,
          duration:2500,
          useNativeDriver:true
        })
      ])
    ).start()
  },[])
  function animatePress(type){
    const anim=type === "CEP"? scaleCep: scaleEnd
    Animated.sequence([
      Animated.timing(anim,{
        toValue:0.96,
        duration:100,
        useNativeDriver:true
      }),
      Animated.timing(anim,{
        toValue:1,
        duration:100,
        useNativeDriver:true
      })
    ]).start()
  }
  function mostrarList(){
    setOpenList(!openList)
  }
  function selecionar(tipo){
    setSelected(tipo)
  }
  function digitar(e){
    const numeros=e.replace(/[^0-9]/g,"")
    setCep(numeros)
  }
  async function buscaEnd(){
    if(rua === "" || cidade === ""){
      console.log("Preencha todos os campos")
      return
    }
    try{
      const res = await buscarCep(estadoSelecionado,cidade,rua)
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }
  async function buscaCep(){
    try{
      const res = await buscarEnd(cep)
      const historico=await AsyncStorage.getItem("historico")
      if(historico == null){
        await AsyncStorage.setItem("historico",JSON.stringify([cep]))
      }else{
        const novoHistorico=JSON.parse(historico)
        novoHistorico.push(cep)
        await AsyncStorage.setItem("historico",JSON.stringify(novoHistorico))
      }
      const enderecoCompleto =res.logradouro +" " +res.localidade +" " +res.uf
      const coordenadas=await buscarCoordenadas(enderecoCompleto)
      const latitude=coordenadas[0].lat
      const longitude=coordenadas[0].lon
      setCoords({
        latitude:String(latitude),
        longitude:String(longitude)
      })
      navigation.navigate("Map",{latitude,longitude})
    }catch(err){
      console.log("Erro: " + err)
    }
  }
  return(
    <View
      style={[globalStyles.container,styles.container]}>
      <View style={styles.containerOne}>
        <Animated.View
          style={{
            transform:[
              {
                translateY:floatAnim
              }
            ]
          }}
        >
          <Text style={styles.text}>Olá, {nameUser}!</Text>
          <Text style={styles.subtext}>Encontre o ônibus mais próximo de você</Text>
        </Animated.View>
        <NotificationIcon/>
      </View>
      <View>
        <Text
          style={[styles.text,styles.titleSearch,globalStyles.centro]}>Opções de Busca</Text>
        <View style={styles.search}>
          <Animated.View
            style={[
              styles.slider,
              {
                left:slideAnim.interpolate({
                  inputRange:[0,1],
                  outputRange:["0%","50%"]
                })
              }
            ]}
          />
          <Animated.View
            style={{
              transform:[
                {scale:scaleCep}
              ],
              width:"50%"
            }}
          >
            <Pressable
              style={styles.btnSearch}
              onPress={()=>{
                selecionar("CEP")
                animatePress("CEP")
              }}>
            <Text style={styles.textBtnSearch}>Por CEP</Text>
            </Pressable>
          </Animated.View>
          <Animated.View
            style={{
              transform:[
                {scale:scaleEnd}
              ],
              width:"50%"
            }}
          >
            <Pressable
              style={styles.btnSearch}
              onPress={()=>{
                selecionar("END")
                animatePress("END")
              }}>
              <Text style={styles.textBtnSearch}>Por Endereço</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
      <View style={styles.containerTwo}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <CepIcon/>
          {selected === "CEP" && (
            <View style={styles.content}>
              <Text style={styles.text}>Informe o CEP</Text>
              <Text style={styles.subtext}>Vamos mostrar os pontos próximos</Text>
              <TextInput
                style={styles.entrada}
                keyboardType="numeric"
                onChangeText={digitar}
                value={cep}
                placeholder="Digite o CEP..."
                placeholderTextColor="#94A3B8"
              />
              <Pressable onPress={buscaCep}>
                <LinearGradient
                  colors={["#5AB2FF","#3B82F6"]}
                  start={{x:0,y:1}}
                  style={styles.btnMap}
                >
                  <Text style={styles.textBtnMap}>Mostrar no mapa</Text>
                </LinearGradient>
              </Pressable>
            </View>
          )}
          {selected === "END" && (
            <View style={styles.infoEnd}>
              <Text style={styles.text}>Informe o Endereço</Text>
              <Text style={styles.subtext}>Vamos mostrar os pontos próximos</Text>
              <Text style={styles.label}>Selecione o estado</Text>
              <Pressable
                style={styles.selectEstado}
                onPress={mostrarList}>
                <Text style={styles.estadoSelecionado}>
                  {estadoSelecionado}
                </Text>
                <ArrowDownIcon/>
              </Pressable>
              {openList && (
                <ScrollView style={styles.list}>
                  {estados.map((valor)=>(
                    <Text
                      key={valor}
                      style={styles.estado}
                      onPress={()=>{
                        setEstadoSelecionado(valor)
                        setOpenList(false)
                      }}
                    >
                      {valor}
                    </Text>
                  ))}
                </ScrollView>
              )}
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                placeholder="Digite a cidade..."
                style={styles.entrada}
                value={cidade}
                onChangeText={setCidade}
              />
              <Text style={styles.label}>Rua</Text>
              <TextInput
                placeholder="Digite a rua..."
                style={styles.entrada}
                value={rua}
                onChangeText={setRua}
              />
              <Pressable onPress={buscaEnd}>
                <LinearGradient
                  colors={["#5AB2FF","#3B82F6"]}
                  start={{x:0,y:1}}
                  style={styles.btnMap}>
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