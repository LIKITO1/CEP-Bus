import Ionicons from '@expo/vector-icons/Ionicons';
import {TouchableOpacity,Text,View} from "react-native"
import {useNavigation} from "@react-navigation/native"
import { iconStyles } from '../styles/iconStyles';
export default function MapIcon(){
  const navigation=useNavigation()
  function map(){
    navigation.navigate('Map')
  }
  return(
    <View>
    <TouchableOpacity onPress={map} style={iconStyles.container}>
      <Ionicons name="map-outline" style={iconStyles.icon} color="black" />
      <Text style={iconStyles.text}>Mapa</Text>
    </TouchableOpacity>
  </View>
  )
}