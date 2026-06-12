import { View, Text, ScrollView, TouchableOpacity, Pressable } from "react-native"
import Menu from "../layouts/Menu"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState, useCallback } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Feather from '@expo/vector-icons/Feather'
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { buscarCoordenadas } from "../../services/geocode"
import { styles } from "../styles/favoriteStyles"
import ErrorMsg from "../layouts/ErrorMsg"
export default function Favorite() {
    const [favoritos, setFavoritos] = useState([])
    const [msg,setMsg]=useState("")
    const [keyMsg,setKeyMsg]=useState(0)
    const navigation = useNavigation()
    async function carregarFavoritos() {
        const dataString = await AsyncStorage.getItem("favoritos")
        const data=JSON.parse(dataString)
        if(data){
            setFavoritos(data)
        }
    }
    useFocusEffect(
        useCallback(() => {
            carregarFavoritos()
        }, [])
    )
    async function removerFavorito(index) {
        const novos = favoritos.filter((a,i) => i !== index)
        await AsyncStorage.setItem("favoritos", JSON.stringify(novos))
        setFavoritos(novos)
    }
    async function navegarParaMapa(valor) {
        try {
            const end = (valor.logradouro || "") + " " + valor.localidade + " " + valor.uf
            const coordenadas = await buscarCoordenadas(end)
            if(!coordenadas||coordenadas.length==0){
                setMsg("Coordenadas não recebidas")
                setKeyMsg((e)=>e+1)
                return
              }
            const latitude = coordenadas[0].lat
            const longitude = coordenadas[0].lon
            navigation.navigate("Map", { latitude, longitude })
        } catch (err) {
            setMsg("Erro ao navegar:", err)
            setKeyMsg((e)=>e+1)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F8FF' }}>
            {msg&&(
                <ErrorMsg msg={msg} key={keyMsg}/>
            )}
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Favoritos</Text>
                    <Text style={styles.subtitle}>
                        {favoritos.length} {favoritos.length === 1 ? 'local salvo' : 'locais salvos'}
                    </Text>
                </View>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {favoritos.length === 0?(
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconContainer}>
                                <Feather name="star" size={48} color="#F59E0B" />
                            </View>
                            <Text style={styles.emptyTitle}>Sem favoritos</Text>
                            <Text style={styles.emptyText}>Adicione locais favoritos pela estrela no histórico de buscas</Text>
                        </View>
                    ):(favoritos.map((fav, index) => (
                            <Pressable key={index} style={styles.card} onPress={() => navegarParaMapa(fav)}>
                                <View style={styles.cardTop}>
                                    <View style={styles.cardLeft}>
                                        <View style={styles.starCircle}>
                                            <Feather name="star" size={20} color="#F59E0B" />
                                        </View>
                                        <View style={styles.cepBadge}>
                                            <Text style={styles.cepText}>{fav.cep}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardActions}>
                                        <TouchableOpacity style={[styles.actionBtn, styles.mapBtn]} onPress={() => navegarParaMapa(fav)} >
                                            <Feather name="map-pin" size={16} color="#3B82F6" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => removerFavorito(index)}>
                                            <Feather name="trash-2" size={16} color="#EF4444" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                <Text style={styles.logradouro}>
                                    {fav.logradouro || "Logradouro não informado"}
                                </Text>
                                <View style={styles.infoRow}>
                                    {fav.bairro&&(
                                        <View style={styles.infoItem}>
                                            <Text style={styles.infoLabel}>Bairro</Text>
                                            <Text style={styles.infoValue}>{fav.bairro}</Text>
                                        </View>
                                    )}
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoLabel}>Cidade</Text>
                                        <Text style={styles.infoValue}>{fav.localidade}</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <View style={styles.ufBadge}>
                                            <Text style={styles.ufText}>{fav.uf}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        ))
                    )}
                </ScrollView>
                <Menu />
            </View>
        </SafeAreaView>
    )
}