import {View,Text,Image} from "react-native"
import {styles} from "../styles/temperatureStyles"
import {useState,useEffect} from "react"
export default function Temperature({temperatura}){
    const frio=require("../../assets/frio.png")
    const sol=require("../../assets/sol_sorridente.png")
    const quente=require("../../assets/quente.png")
    const [imagem,setImagem]=useState(null)
    useEffect(()=>{
        if(temperatura<30){
            if(temperatura<20){
                setImagem(frio)
            }else{
                setImagem(sol)
            }
        }else{
            setImagem(quente)
        }
        
    },[temperatura])
    return(
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.text}>{temperatura}{'\u00A0'}°C</Text>
                <Image source={imagem} style={{width:50}}/>
            </View>
        </View>
    )
}