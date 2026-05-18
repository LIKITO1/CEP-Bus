import {View,Text} from "react-native"
import Menu from "../layouts/Menu"
export default function Home(){
  return(
    <View style={{flex:1}}>
      <Text>Home</Text>
      <Menu/>
    </View>
  )
}