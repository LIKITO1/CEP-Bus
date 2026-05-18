import Ionicons from '@expo/vector-icons/Ionicons';
import {Pressable,StyleSheet,Text} from "react-native"
export default function PerfilIcon(){
  function perfil(){
    
  }
  return(
    <Pressable onPress={perfil} style={styles.container}>
      <Ionicons name="person-outline" size={24} color="black"/>
      <Text style={styles.text}>Perfil</Text>
    </Pressable>
  )
}
const styles=StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  text:{
    fontSize:12
  }
})