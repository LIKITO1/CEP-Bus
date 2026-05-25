import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet/dist/leaflet.css"
import {View,Text,TouchableOpacity} from "react-native"
import Menu from "../layouts/Menu"
import {styles} from "../styles/mapStyles"
import { globalStyles } from "../styles/globalStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import {MapContainer,TileLayer,Marker,Popup,Circle} from "react-leaflet"
import * as Location from 'expo-location'
import {useEffect,useState,useRef} from "react"
export default function Map({route}){
  const [location,setLocation]=useState(null)
  const [locationCEP,setLocationCEP]=useState(null)
  const [pontos,setPontos]=useState(null)
  const [temperatura,setTemperatura]=useState(null)
  const mapRef=useRef(null)
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
  function verificaParams(){
    if(route.params){
      const {longitude,latitude,pontos,temperatura}=route.params
      setPontos(pontos)
      setTemperatura(temperatura)
      setLocationCEP({latitude:Number(latitude),longitude:Number(longitude)})
    }
  }
  async function pegarPosition(){
    const {status}=await Location.requestForegroundPermissionsAsync()
    if(status=="granted"){
      const atualLocation=await Location.getCurrentPositionAsync({})
      setLocation(atualLocation.coords)
    }
  }
  useEffect(()=>{
    pegarPosition()
    verificaParams()
  },[])
  if(!locationCEP&&!location){
    return(
      <Text>Carregando...</Text>
    )
  }
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={globalStyles.container}>
      <MapContainer ref={mapRef}
        style={{height:"100vh",width:"100%"}}
        center={[
          locationCEP? locationCEP.latitude:location.latitude,
          locationCEP?locationCEP.longitude:location.longitude,
        ]}
        zoom={18}>
        <TileLayer attribution="OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {location&&(
        <Marker
          position={[
            location.latitude,
            location.longitude,
          ]}>
            <Popup>Você</Popup>
        </Marker>
        )}
        {locationCEP&&(
          <>
            <Marker position={[
              locationCEP.latitude,
              locationCEP.longitude
            ]}>
                <Popup>CEP digitado</Popup>
            </Marker>
            <Circle center={[
              locationCEP.latitude,
              locationCEP.longitude
            ]} radius={200} weight={0} fillColor="rgba(0,122,255,0.2)"/>
          </>
        )}
        {pontos&&(
          pontos.map((valor)=>(
            <Marker key={valor.stop_id} position={[
              Number(valor.stop_lat),
              Number(valor.stop_lon)
            ]}>
                <Popup>{valor.stop_name}</Popup>
            </Marker>
          ))
        )}
      </MapContainer>
      <TouchableOpacity onPress={centralizar} style={styles.btn}>
        <Text style={styles.textoBtn}>Onde estou?</Text>
      </TouchableOpacity>
      {locationCEP&(
      <TouchableOpacity onPress={centralizarCEP} style={styles.btn1}>
        <Text style={styles.textoBtn}>CEP que digitei</Text>
      </TouchableOpacity>
      )}
      {temperatura!=null&&(
        <View style={styles.clima}>
          <Text style={styles.temp}>Temperatura:{temperatura}°C</Text>
        </View>
      )}
      <Menu/>
      </View>
    </SafeAreaView>
  )
}