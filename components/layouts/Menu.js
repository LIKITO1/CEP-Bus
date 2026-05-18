import {View,Text,StyleSheet} from "react-native"
import HomeIcon from "../icons/HomeIcon"
import PerfilIcon from "../icons/PerfilIcon"
import RoutesIcon from "../icons/RoutesIcon"
import FavoritesIcon from "../icons/FavoritesIcon"
export default function Menu(){
  return (
    <View style={styles.container}>
      <HomeIcon/>
      <RoutesIcon/>
      <FavoritesIcon/>
      <PerfilIcon/>
    </View>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    height:'13%',
    display:"flex",
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-around',
    bottom:0,
    position:'absolute',
    backgroundColor:'gray'
  }
})