import Octicons from '@expo/vector-icons/Octicons';
import {TouchableOpacity,Text} from "react-native"
import { useNavigation } from '@react-navigation/native';
import { iconStyles } from '../styles/iconStyles';
export default function HomeIcon(){
  const navigation=useNavigation()
  function home(){
    navigation.navigate('Home')
  }
  return(
    <TouchableOpacity onPress={home} style={iconStyles.container}>
      <Octicons name="home" style={iconStyles.icon} color="black"/>
      <Text style={iconStyles.text}>Home</Text>
    </TouchableOpacity>
  )
}