import {View,Text} from "react-native"
import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
import { SafeAreaView } from "react-native-safe-area-context"
export default function Favorite(){
  return(
    <SafeAreaView style={{flex:1}}>
    <View style={globalStyles.container}>
    <Text>Favorite</Text>
    <Menu/>
    </View>
    </SafeAreaView>
  )
}