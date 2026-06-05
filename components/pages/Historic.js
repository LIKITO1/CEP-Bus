import {View,Text} from "react-native"
import ArrowLeftIcon from "../icons/ArrowLeftIcon"
import Menu from "../layouts/Menu"
import {styles} from "../styles/historicStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import {useState,useEffect} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Historic(){
    const [historico,setHistorico]=useState([])
    async function verHistorico(){
        const data=await AsyncStorage.getItem("historico")
        if(data){
            setHistorico(JSON.parse(data))
        }else{
            setHistorico([])
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
                <Text style={styles.text}>Historico</Text>
                <Text style={styles.clear}>Limpar</Text>
            </View>
            <View style={styles.itens}>
                    {historico.length === 0&&(
                        <Text style={styles.item}>O historico esta vazio</Text>
                    )}
                    {historico.map((valor)=>(
                        <Text key={valor} style={styles.item}>{valor}</Text>
                    ))}
                </View>
            <Menu/>
        </View>
        </SafeAreaView>
    )
}
