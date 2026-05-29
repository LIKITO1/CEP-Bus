import {View,Text} from "react-native"
import {useState,useEffect} from "react"
import { testaAPI } from "../../services/testaAPI"
import { StyleSheet } from "react-native"
export default function ConnectionConfirm(){
    const [msg,setMsg]=useState("Conectando-se ao servidor")
    const [ball,setBall]=useState("waiting")
    useEffect(()=>{
        setInterval(()=>{
        (async function(){
            setMsg("Verificando conexão")
            setBall("waiting")
            const res=await testaAPI()
            setMsg(res.msg)
            if(!res.msg){
                setMsg("Servidor desconectado")
                setBall("disconected")
                return;
            }
            setBall("conected")
        })()
    },30000)
    },[])
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{msg}</Text>
            {ball=="conected"&&(
            <View style={[styles.ball,styles.conected]}></View>
            )}
            {ball=="waiting"&&(
            <View style={[styles.ball,styles.waiting]}></View>
            )}
            {ball=="disconected"&&(
            <View style={[styles.ball,styles.disconected]}></View>
            )}
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        position:'absolute',
        height:25,
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        gap:30,
        top:0,
        backgroundColor:'#ddd'
    },
    ball:{
        width:8,
        height:8,
        borderRadius:10
    },
    conected:{
        backgroundColor:'green'
    },
    waiting:{
        backgroundColor:'#FE8D59'
    },
    disconected:{
        backgroundColor:'red'
    },
    text:{
        fontSize:15,
        fontWeight:500
    }
})