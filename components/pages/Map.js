import {View,Text} from "react-native"
import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
export default function Map(){
  return(
    <View style={globalStyles.container}>
    <Text>Mapa</Text>
    <Menu/>
    </View>
  )
}