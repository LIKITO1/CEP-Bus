import AntDesign from '@expo/vector-icons/AntDesign';
import {TouchableOpacity,StyleSheet,Text} from "react-native"
import {useNavigation} from "@react-navigation/native"
export default function FavoritesIcon(){
  const navigation=useNavigation()
  function favorites(){
    navigation.navigate('Favorite')
  }
  return(
    <TouchableOpacity onPress={favorites} style={styles.container}>
      <AntDesign name="star" size={24} color="black" />
      <Text style={styles.text}>Favoritos</Text>
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