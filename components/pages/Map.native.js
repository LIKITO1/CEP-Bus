import MapView, {Marker,Circle,Polyline,Callout} from "react-native-maps";
import {View,Text,TouchableOpacity} from "react-native"
import Menu from "../layouts/Menu"
import {styles} from "../styles/mapStyles"
import { globalStyles } from "../styles/globalStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import { getDistance } from "geolib";
import * as Location from 'expo-location'
import {useEffect,useState,useRef} from "react"
import Loading from "../layouts/Loading"
import { rotaAPe } from "../../services/rotaAPe"
import { buscarParadas } from "../../services/paradas"
import {buscarClima} from "../../services/weather"
const markerRoxo = require("../../assets/marker-purple.png")
const markerAmarelo = require("../../assets/marker-yellow.png")
const markerVerde = require("../../assets/marker-green.png")
export default function Map({route}){
  const [location,setLocation]=useState(null)
  const [locationCEP,setLocationCEP]=useState(null)
  const [pontos,setPontos]=useState([])
  const [temperatura,setTemperatura]=useState(null)
  const [erroLocation,setErroLocation]=useState(false)
  const [mensagemErro,setMensagemErro]=useState("")
  const mapRef=useRef(null)
  const latitudeCEP=locationCEP?.latitude ?? null
  const longitudeCEP=locationCEP?.longitude ?? null
  const latitudeMapa = latitudeCEP ?? location?.latitude
  const longitudeMapa = longitudeCEP ?? location?.longitude
  const temCEP=route.params!=null
  const carregando = temCEP?locationCEP == null && mensagemErro === "": location == null && !erroLocation
  const [rota,setRota]=useState(null)
  const [tempo,setTempo]=useState(null)
  const [pontoMaisProximo,setPontoMaisProximo]=useState(null)
  function centralizar() {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }
  function centralizarCEP() {
    if (locationCEP && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: locationCEP.latitude,
        longitude: locationCEP.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }
  async function pegarPosition(){
    try{
      setMensagemErro("")
      const {status}=await Location.requestForegroundPermissionsAsync()
      if(status=="granted"){
        const atualLocation=await Location.getCurrentPositionAsync({})
        setLocation(atualLocation.coords)
        setErroLocation(false)
      }else{
        setMensagemErro("Permissao de localizacao negada. Ative a permissao para ver sua posicao no mapa.")
        setErroLocation(true)
      }
    }catch(err){
      console.log("Erro ao pegar localização: " + err)
      setMensagemErro("Nao foi possivel obter sua localizacao agora. Tente novamente.")
      setErroLocation(true)
    }
  }
  async function carregarDados(){
    if(route.params){
      try{
      setMensagemErro("")
      const {longitude,latitude}=route.params
      const latitudeNumero=Number(latitude)
      const longitudeNumero=Number(longitude)
      if(Number.isNaN(latitudeNumero)||Number.isNaN(longitudeNumero)){
        setMensagemErro("Coordenadas invalidas para abrir o mapa.")
        setErroLocation(true)
        return
      }
      setLocationCEP({latitude:latitudeNumero,longitude:longitudeNumero})
      setErroLocation(false)
      setRota(null)
      setTempo(null)
      setPontoMaisProximo(null)
      const [pontos,temperatura]=await Promise.all([
        buscarParadas(latitudeNumero,longitudeNumero),
        buscarClima(latitudeNumero,longitudeNumero)
      ])
      if(temperatura?.msg){
        console.log(temperatura.msg)
      }
      const pontosComDistancia=Array.isArray(pontos)?pontos.map((valor)=>{
        const distancia = getDistance(
            {
              latitude: latitudeNumero,
              longitude: longitudeNumero,
            },
            {
              latitude: valor.lat,
              longitude: valor.lon,
            }
          );
        return {...valor,distancia:Math.round(distancia)}
      }):[]
      pontosComDistancia.sort((a,b)=>a.distancia-b.distancia)
      setPontos(pontosComDistancia)
      setTemperatura(temperatura?.temperatura ?? null)
      }catch(err){
        console.log("Erro ao carregar dados do mapa: " + err)
        setMensagemErro("Nao foi possivel carregar paradas e clima. O mapa ainda pode ser usado.")
        setPontos([])
      }
    }
  }
  function tentarNovamente(){
    setErroLocation(false)
    setMensagemErro("")
    setPontos([])
    setRota(null)
    setTempo(null)
    setPontoMaisProximo(null)
    pegarPosition()
    carregarDados()
  }
  useEffect(()=>{
    pegarPosition()
    carregarDados()
  },[])
  useEffect(()=>{
    async function rotaMaisProximo(){
      if(locationCEP&&Array.isArray(pontos)&&pontos.length>0){
        try{
        const pontosProximos=pontos.slice(0,3)
        const resultados=await Promise.allSettled(
          pontosProximos.map(async (ponto)=>{
            const res=await rotaAPe(locationCEP.latitude,locationCEP.longitude,ponto.lat,ponto.lon)
            return {...res,ponto}
          })
        )
        const rotasValidas=resultados
          .filter((resultado)=>resultado.status==="fulfilled")
          .map((resultado)=>resultado.value)
          .filter((valor)=>valor&&typeof valor.distancia==="number")
        if(rotasValidas.length===0){
          setRota(null)
          setTempo(null)
          setPontoMaisProximo(null)
          return
        }
        const maisProxima=rotasValidas.sort((a,b)=>a.distancia-b.distancia)[0]
        setTempo(Math.round(maisProxima.tempo/60))
        setRota(maisProxima.rota)
        setPontoMaisProximo({
          ...maisProxima.ponto,
          distanciaRota:Math.round(maisProxima.distancia),
          tempoRota:Math.round(maisProxima.tempo/60)
        })
        }catch(err){
          console.log("Erro ao buscar rota a pé: " + err)
          setRota(null)
          setTempo(null)
          setPontoMaisProximo(null)
        }
    }
  }
  rotaMaisProximo()
  },[pontos,locationCEP])
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={globalStyles.container}>
        {!carregando&&latitudeMapa!=null&&longitudeMapa!=null&&(
          <>
      <MapView
  ref={mapRef}
  style={{ height: "90%", width: "100%" }}
  initialRegion={{
    latitude: latitudeMapa,
    longitude: longitudeMapa,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }}
>
  {location && (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
    >
      <Callout>
        <Text>Você</Text>
      </Callout>
    </Marker>
  )}

  {locationCEP && (
    <>
      <Marker
        coordinate={{
          latitude: latitudeCEP,
          longitude: longitudeCEP,
        }}
        image={markerRoxo}
      >
        <Callout>
          <Text>CEP digitado</Text>
        </Callout>
      </Marker>

      <Circle
        center={{
          latitude: latitudeCEP,
          longitude: longitudeCEP,
        }}
        radius={300}
        fillColor="rgba(0,122,255,0.3)"
        strokeWidth={0}
      />
    </>
  )}

  {Array.isArray(pontos) &&
    pontos.map((valor) => (
      <Marker
        key={valor.id}
        coordinate={{
          latitude: valor.lat,
          longitude: valor.lon,
        }}
        image={
          pontoMaisProximo?.id === valor.id
            ? markerVerde
            : markerAmarelo
        }
      >
        <Callout>
          <Text>
            {pontoMaisProximo?.id === valor.id
              ? `Parada mais próxima: ${pontoMaisProximo.distanciaRota}m pela rota (${pontoMaisProximo.tempoRota} min)`
              : `Parada a ${valor.distancia}m em linha reta`}
          </Text>
        </Callout>
      </Marker>
    ))}

  {rota && (
    <Polyline
      coordinates={rota.map((coord) => ({
        latitude: coord[0],
        longitude: coord[1],
      }))}
      strokeWidth={5}
      strokeColor="blue"
    />
  )}
</MapView>
      <TouchableOpacity onPress={centralizar} style={[styles.btn,{backgroundColor:'#B5B5B5'}]}>
        <Text style={styles.textoBtn}>Onde estou?</Text>
      </TouchableOpacity>
      {(latitudeCEP!=null&&longitudeCEP!=null)&&(
      <TouchableOpacity onPress={centralizarCEP} style={styles.btn1}>
        <Text style={styles.textoBtn}>CEP que digitei</Text>
      </TouchableOpacity>
      )}
      {temperatura!=null&&(
        <View style={styles.clima}>
          <Text style={styles.temp}>Temperatura:{temperatura}°C</Text>
        </View>
      )}
      </>
    )}
      {!carregando&&(latitudeMapa==null||longitudeMapa==null)&&(
        <View style={styles.feedback}>
          <Text style={styles.feedbackTitle}>Mapa indisponivel</Text>
          <Text style={styles.feedbackText}>
            {mensagemErro || "Nao encontramos uma localizacao valida para centralizar o mapa."}
          </Text>
          <TouchableOpacity onPress={tentarNovamente} style={styles.feedbackButton}>
            <Text style={styles.feedbackButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      )}
      <Menu/>
      {carregando ? (
        <Loading/>
      ) : null}
      </View>
    </SafeAreaView>
  )
}