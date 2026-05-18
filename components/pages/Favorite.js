import {View,Text} from "react-native"
import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
export default function Favorite(){
  return(
    <View style={globalStyles.container}>
    <Text>Favorite</Text>
    <Menu/>
    </View>
  )
}