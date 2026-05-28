import {View,Text} from "react-native"
import ArrowLeftIcon from "../icons/ArrowLeftIcon"
import Menu from "../layouts/Menu"
import {styles} from "../styles/historicStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import {useState,useEffect} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function Historic(){
    const [historico,setHistorico]=useState(null)
    async function verHistorico(){
        const data=await AsyncStorage.getItem("historico")
        if(data){
            setHistorico(JSON.parse(data))
        }else{
            setHistorico("O histórico esta vazio")
        }
    }
    useEffect(()=>{
        (async function(){
            await verHistorico()
        })()
    },[])
    return(
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.top}>
                <ArrowLeftIcon/>
                <Text style={styles.text}>Histórico</Text>
                <Text style={styles.clear}>Limpar</Text>
            </View>
            <View style={styles.itens}>
                    {historico&&historico.map((valor)=>(
                        <Text key={valor} style={styles.item}>{valor}</Text>
                    ))}
                </View>
            <Menu/>
        </View>
        </SafeAreaView>
    )
}