import Entypo from '@expo/vector-icons/Entypo';
import {TouchableOpacity,Text,StyleSheet} from "react-native"
export default function HomeIcon(){
  function home(){

  }
  return(
    <TouchableOpacity onPress={home} style={styles.container}>
      <Entypo name="home" size={24} color="black"/>
      <Text style={styles.text}>Home</Text>
    </TouchableOpacity>
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