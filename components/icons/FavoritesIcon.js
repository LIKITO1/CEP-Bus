import Feather from '@expo/vector-icons/Feather';
import {TouchableOpacity,Text} from "react-native"
import {useNavigation} from "@react-navigation/native"
import { iconStyles } from '../styles/iconStyles';
export default function FavoritesIcon(){
  const navigation=useNavigation()
  function favorites(){
    navigation.navigate('Favorite')
  }
  return(
    <TouchableOpacity onPress={favorites} style={iconStyles.container}>
      <Feather name="star" style={iconStyles.icon} color="black" />
      <Text style={iconStyles.text}>Favoritos</Text>
    </TouchableOpacity>
  )
}