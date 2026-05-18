import {View,Text} from "react-native"
import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
export default function Route(){
  return(
    <View style={globalStyles.container}>
    <Text>Rotas</Text>
    <Menu/>
    </View>
  )
}