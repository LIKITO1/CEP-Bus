import Feather from '@expo/vector-icons/Feather';
import {TouchableOpacity,StyleSheet,Text} from "react-native"
import {useNavigation} from "@react-navigation/native"
import { iconStyles } from '../styles/iconStyles';
export default function FavoritesIcon(){
  const navigation=useNavigation()
  function favorites(){
    navigation.navigate('Favorite')
  }
  return(
    <TouchableOpacity onPress={favorites} style={styles.container}>
      <Feather name="star" style={iconStyles.icon} color="black" />
      <Text style={iconStyles.text}>Favoritos</Text>
    </TouchableOpacity>
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