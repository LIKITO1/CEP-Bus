import Ionicons from '@expo/vector-icons/Ionicons';
import {TouchableOpacity,StyleSheet,Text,View} from "react-native"
import {useNavigation} from "@react-navigation/native"
export default function MapIcon(){
  const navigation=useNavigation()
  function map(){
    navigation.navigate('Map')
  }
  return(
    <View>
    <TouchableOpacity onPress={map} style={styles.container}>
      <Ionicons name="map-outline" size={24} color="black" />
      <Text style={styles.text}>Mapa</Text>
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
  },
  text:{
    fontSize:12
  }
})