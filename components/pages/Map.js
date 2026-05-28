import "leaflet/dist/leaflet.css"
import L from "leaflet"
import {View,Text,TouchableOpacity} from "react-native"
import Menu from "../layouts/Menu"
import {styles} from "../styles/mapStyles"
import { globalStyles } from "../styles/globalStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import {MapContainer,TileLayer,Marker,Popup,Circle,Polyline} from "react-leaflet"
import * as Location from 'expo-location'
import {useEffect,useState,useRef} from "react"
import Loading from "../layouts/Loading"
import { rotaAPe } from "../../services/rotaAPe"
import { buscarParadas } from "../../services/paradas"
import {buscarClima} from "../../services/weather"
const markerIcon = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
const markerIcon2x = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png"
const markerShadow = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})
const roxo = L.icon({
  iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
  shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize:[25,41],
  iconAnchor:[12,41]
})
const amarelo = L.icon({
  iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize:[25,41],
  iconAnchor:[12,41]
})
export default function Map({route}){
  const [location,setLocation]=useState(null)
  const [locationCEP,setLocationCEP]=useState(null)
  const [pontos,setPontos]=useState([])
  const [temperatura,setTemperatura]=useState(null)
  const mapRef=useRef(null)
  const latitudeCEP=locationCEP?.latitude ?? null
  const longitudeCEP=locationCEP?.longitude ?? null
  const latitudeMapa = latitudeCEP ?? location?.latitude
  const longitudeMapa = longitudeCEP ?? location?.longitude
  const temCEP=route.params!=null
  const carregando = temCEP?locationCEP == null: location == null
  const [rota,setRota]=useState(null)
  const [tempo,setTempo]=useState(null)
  function centralizar(){
    if(location){
    mapRef.current.setView([
      location.latitude,
      location.longitude
    ],18)
  }
  }
  function centralizarCEP(){
    if(locationCEP){
      mapRef.current.setView([
        locationCEP.latitude,
        locationCEP.longitude
      ],18)
    }
  }
  async function pegarPosition(){
    const {status}=await Location.requestForegroundPermissionsAsync()
    if(status=="granted"){
      const atualLocation=await Location.getCurrentPositionAsync({})
      setLocation(atualLocation.coords)
    }
  }
  async function carregarDados(){
    if(route.params){
      const {longitude,latitude}=route.params
      const [pontos,temperatura]=await Promise.all([
        buscarParadas(latitude,longitude),
        buscarClima(latitude,longitude)
      ])
      if(temperatura.msg){
        console.log(temperatura.msg)
      }
      const pontosComDistancia=pontos.map((valor)=>{
        const distancia=L.latLng(latitude,longitude).distanceTo(L.latLng(valor.lat,valor.lon))
        return {...valor,distancia:Math.round(distancia)}
      })
      pontosComDistancia.sort((a,b)=>a.distancia-b.distancia)
      setPontos(pontosComDistancia)
      setTemperatura(temperatura.temperatura)
      setLocationCEP({latitude:Number(latitude),longitude:Number(longitude)})
    }
  }
  useEffect(()=>{
    pegarPosition()
    carregarDados()
  },[])
  useEffect(()=>{
    async function rotaMaisProximo(){
      if(Array.isArray(pontos)&&pontos.length>0&&pontos){
        const res=await rotaAPe(locationCEP.latitude,locationCEP.longitude,pontos[0].lat,pontos[0].lon)
        setTempo(Math.round(res.tempo/60))
        setRota(res.rota)
    }
  }
  rotaMaisProximo()
  },[pontos])
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={globalStyles.container}>
        {!carregando&&(
          <>
      <MapContainer key={`${latitudeMapa}-${longitudeMapa}`} ref={mapRef}
        style={{height:"90%",width:"100%"}}
        center={[
          latitudeMapa,
          longitudeMapa,
        ]}
        zoom={18}>
        <TileLayer attribution="OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {location!=null&&(
        <Marker
          position={[
            location.latitude,
            location.longitude
          ]}>
            <Popup>Você</Popup>
        </Marker>
        )}
        {locationCEP!=null&&(
          <>
            <Marker position={[
              latitudeCEP,
              longitudeCEP
            ]} icon={roxo}>
                <Popup>CEP digitado</Popup>
            </Marker>
            <Circle center={[
              latitudeCEP,
              longitudeCEP
            ]} radius={300} weight={0} fillColor="rgba(0,122,255,0.5)"/>
          </>
        )}
        {(Array.isArray(pontos)&&pontos.length>0)&&(
          pontos.map((valor)=>(
            <Marker key={valor.id} position={[
              valor.lat,
              valor.lon
            ]} icon={amarelo}>
                <Popup>Parada a {valor.distancia} metros</Popup>
            </Marker>
          ))
        )}
        {rota && (
          <Polyline positions={rota} color="blue" />
        )}
      </MapContainer>
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
      <Menu/>
      {carregando&&(
        <Loading/>
      )}
      </View>
    </SafeAreaView>
  )
}