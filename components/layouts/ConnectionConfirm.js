import {View,Text} from "react-native"
import {useState,useEffect} from "react"
import { testaAPI } from "../../services/testaAPI"
import {styles} from "../styles/connectionStyles"
export default function ConnectionConfirm(){
    const [msg,setMsg]=useState("Conectando-se ao servidor")
    const [ball,setBall]=useState("waiting")
    async function verifica(){
        setMsg("Verificando conexão")
        setBall("waiting")
        try{
            const res=await testaAPI()
            setMsg(res.msg)
            if(!res.msg){
                throw new Error("Problema na conexão")
            }
            setBall("conected")
        }catch(err){
            setBall("disconnected")
            setMsg("Problema na conexão")
        }
    }
    useEffect(()=>{
        verifica()
        const interval=setInterval(()=>{
            verifica()
        },30000)
        return ()=>clearInterval(interval)
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
            {ball=="disconnected"&&(
            <View style={[styles.ball,styles.disconected]}></View>
            )}
        </View>
    )
}