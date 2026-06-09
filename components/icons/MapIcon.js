import Ionicons from '@expo/vector-icons/Ionicons';
import {TouchableOpacity,StyleSheet,Text,View} from "react-native"
import {useNavigation} from "@react-navigation/native"
import { iconStyles } from '../styles/iconStyles';
export default function MapIcon(){
  const navigation=useNavigation()
  function map(){
    navigation.navigate('Map')
  }
  return(
    <View>
    <TouchableOpacity onPress={map} style={styles.container}>
      <Ionicons name="map-outline" style={iconStyles.icon} color="black" />
      <Text style={iconStyles.text}>Mapa</Text>
    </TouchableOpacity>
  </View>
  )
}
const styles=StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  }
})