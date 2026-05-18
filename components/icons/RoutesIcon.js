import Ionicons from '@expo/vector-icons/Ionicons';
import {TouchableOpacity,StyleSheet,Text,View} from "react-native"
import {useNavigation} from "@react-navigation/native"
export default function RoutesIcon(){
  const navigation=useNavigation()
  function routes(){
    navigation.navigate('Route')
  }
  return(
    <View>
    <TouchableOpacity onPress={routes} style={styles.container}>
      <Ionicons name="map-outline" size={24} color="black" />
      <Text style={styles.text}>Rotas</Text>
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