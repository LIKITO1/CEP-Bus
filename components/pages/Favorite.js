import {View,Text} from "react-native"
import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import {styles} from "../styles/favoriteStyles.js"
export default function Favorite(){
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={globalStyles.container}>
      <Text style={styles.title}>Locais Favoritos</Text>
      <View style={styles.locais}>
        <View style={styles.local}>
          <Text style={styles.textInfo}>CEP</Text>
          <Text style={styles.textInfo}>Cidade</Text>
          <Text style={styles.textInfo}>Logradouro</Text>
        </View>
      </View>
      <Menu/>
      </View>
    </SafeAreaView>
  )
}