import {View,Text} from "react-native"
import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
export default function Perfil(){
  return (
    <View style={globalStyles.container}>
    <Text>Perfil</Text>
    <Menu/>
    </View>
  )
}