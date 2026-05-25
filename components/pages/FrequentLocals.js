import {View,Text,Pressable,StyleSheet} from "react-native"
import Menu from "../layouts/Menu"
import AddIcon from "../icons/AddIcon"
import ArrowLeftIcon from "../icons/ArrowLeftIcon"
import { SafeAreaView } from "react-native-safe-area-context"
export default function FrequentLocals(){
    return(
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.top}>
                <ArrowLeftIcon/>
                <Text style={styles.text}>Locais Frequentes</Text>
                <AddIcon/>
            </View>
            <Menu/>
        </View>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    top:{
        position:'absolute',
        top:0,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
        alignItems:'center',
        height:'8%'
    },
    text:{
        fontWeight:500,
        fontSize:20
    },
    symbols:{
        fontSize:30,
        fontWeight:'bold'
    }
})