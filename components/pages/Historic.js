import {View,Text} from "react-native"
import ArrowLeftIcon from "../icons/ArrowLeftIcon"
import Menu from "../layouts/Menu"
import {styles} from "../styles/historicStyles"
import { SafeAreaView } from "react-native-safe-area-context"
export default function Historic(){
    return(
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.top}>
                <ArrowLeftIcon/>
                <Text style={styles.text}>Histórico</Text>
                <Text style={styles.clear}>Limpar</Text>
            </View>
            <Menu/>
        </View>
        </SafeAreaView>
    )
}