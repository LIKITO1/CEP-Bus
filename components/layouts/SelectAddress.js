import {View,Text,ScrollView,Pressable} from "react-native"
import { globalStyles } from "../styles/globalStyles"
import {styles} from "../styles/selectStyles"
import {BlurView} from "expo-blur"
import {useState,useEffect} from "react"
import { buscarCoordenadas } from "../../services/geocode"
import { useNavigation } from "@react-navigation/native"
import CloseIcon from "../icons/CloseIcon"
import ErrorMsg from "./ErrorMsg"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function SelectAddress({enderecos,onClose}){
    const [address,setAddress]=useState([])
    const [msg,setMsg]=useState("")
    const [msgKey,setMsgKey]=useState(0)
    const navigation=useNavigation()
    async function selecionarCEP(logradouro,localidade,uf,cep){
        let enderecoCompleto=logradouro+" "+localidade+" "+uf
        const coordenadas=await buscarCoordenadas(enderecoCompleto)
        const historico=await AsyncStorage.getItem("historico")
        if(historico == null){
            await AsyncStorage.setItem("historico",JSON.stringify([cep]))
          }else{
            const novoHistorico=JSON.parse(historico)
            novoHistorico.push(cep)
            await AsyncStorage.setItem("historico",JSON.stringify(novoHistorico))
          }
        if(coordenadas.length>0){
            const latitude=String(coordenadas[0].lat)
            const longitude=String(coordenadas[0].lon)
            navigation.navigate("Map",{latitude,longitude})
        }else{
            setMsgKey((e)=>e+1)
            setMsg("Local não registrado na API")
        }
    }
    useEffect(()=>{
        setAddress(Array.isArray(enderecos)?enderecos:[])
    },[enderecos])
    return(
        <BlurView style={[globalStyles.container,styles.container]} intensity={65} tint="dark">
            <View style={styles.panel}>
                {msg&&(
                    <ErrorMsg msg={msg} key={msgKey}/>
                )}
                <CloseIcon onPress={onClose}/>
                <View style={styles.header}>
                    <View style={styles.titleGroup}>
                        <Text style={styles.title}>Enderecos encontrados</Text>
                        <Text style={styles.subtitle}>
                            {address.length} {address.length === 1 ? "resultado disponivel" : "resultados disponiveis"}
                        </Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>CEP</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.itens} showsVerticalScrollIndicator={true}>
                    {address.length === 0&&(
                        <View style={styles.emptyBox}>
                            <Text style={styles.emptyTitle}>Nenhum endereco localizado</Text>
                            <Text style={styles.emptyText}>Tente ajustar a cidade, estado ou rua informados.</Text>
                        </View>
                    )}
                    {address.map((valor,index)=>(
                        <Pressable key={`${valor.cep}-${index}`} style={styles.card} onPress={()=>{selecionarCEP(valor.logradouro,valor.localidade,valor.uf,valor.cep)}}>
                            <View style={styles.cardTop}>
                                <Text style={styles.cep}>{valor.cep}</Text>
                                <Text style={styles.uf}>{valor.uf || "BR"}</Text>
                            </View>
                            <Text style={styles.street}>{valor.logradouro || "Logradouro nao informado"}</Text>
                            <View style={styles.infoGrid}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.label}>Cidade</Text>
                                    <Text style={styles.value}>{valor.localidade || "-"}</Text>
                                </View>
                                {valor.bairro!=null&&valor.bairro!=undefined&&(
                                    <View style={styles.infoItem}>
                                        <Text style={styles.label}>Bairro</Text>
                                        <Text style={styles.value}>{valor.bairro}</Text>
                                    </View>
                                )}
                                {valor.unidade!=null&&valor.unidade!=undefined&&(
                                    <View style={styles.infoItem}>
                                        <Text style={styles.label}>Unidade</Text>
                                        <Text style={styles.value}>{valor.unidade}</Text>
                                    </View>
                                )}
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </BlurView>
    )
}
