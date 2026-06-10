import AntDesign from '@expo/vector-icons/AntDesign';
import { iconStyles } from '../styles/iconStyles';
import { TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function HistoricIcon(){
  const navigation=useNavigation()
  function redirecionar(){
    navigation.navigate("Historic")
  }
  return(
    <TouchableOpacity style={iconStyles.container} onPress={redirecionar}>
      <AntDesign name="history" style={iconStyles.icon} color="black"/>
      <Text style={iconStyles.text}>Histórico</Text>
    </TouchableOpacity>
  )
}