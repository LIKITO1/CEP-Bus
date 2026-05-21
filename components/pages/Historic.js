import {View,StyleSheet,Text} from "react-native"
import ArrowLeftIcon from "../icons/ArrowLeftIcon"
import Menu from "../layouts/Menu"
export default function Historic(){
    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <ArrowLeftIcon/>
                <Text style={styles.text}>Histórico</Text>
                <Text style={styles.clear}>Limpar</Text>
            </View>
            <Menu/>
        </View>
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
    },
    clear:{
        color:'blue',
        fontWeight:500,
        fontSize:14
    }
})