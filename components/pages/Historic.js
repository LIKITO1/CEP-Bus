import { View, Text, Pressable, ScrollView, TouchableOpacity } from "react-native"
import Menu from "../layouts/Menu"
import { styles } from "../styles/historicStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState, useEffect, useCallback } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { buscarEnd } from "../../services/viacep"
import { buscarCoordenadas } from "../../services/geocode"

export default function Historic() {
    const [historico, setHistorico] = useState([])
    const [favoritando, setFavoritando] = useState(null)
    const navigation = useNavigation()

    async function verHistorico() {
        const data = await AsyncStorage.getItem("historico")
        setHistorico(data ? JSON.parse(data) : [])
    }

    useFocusEffect(
        useCallback(() => {
            verHistorico()
        }, [])
    )

    async function limparHistorico() {
        await AsyncStorage.removeItem("historico")
        setHistorico([])
    }

    async function removerItem(index) {
        const novo = historico.filter((_, i) => i !== index)
        await AsyncStorage.setItem("historico", JSON.stringify(novo))
        setHistorico(novo)
    }

    async function adicionarFavorito(cep, index) {
        try {
            setFavoritando(index)
            const res = await buscarEnd(cep)
            const favorito = {
                cep: res.cep || cep,
                logradouro: res.logradouro,
                bairro: res.bairro,
                localidade: res.localidade,
                uf: res.uf,
                savedAt: Date.now()
            }
            const data = await AsyncStorage.getItem("favoritos")
            const favoritos = data ? JSON.parse(data) : []
            const jaExiste = favoritos.some(f => f.cep === favorito.cep)
            if (!jaExiste) {
                favoritos.push(favorito)
                await AsyncStorage.setItem("favoritos", JSON.stringify(favoritos))
            }
        } catch (err) {
            console.log("Erro ao favoritar:", err)
        } finally {
            setFavoritando(null)
        }
    }

    async function navegarParaMapa(cep) {
        try {
            const res = await buscarEnd(cep)
            const end = (res.logradouro || "") + " " + res.localidade + " " + res.uf
            const coords = await buscarCoordenadas(end)
            const latitude = coords[0].lat
            const longitude = coords[0].lon
            navigation.navigate("Map", { latitude, longitude })
        } catch (err) {
            console.log("Erro ao navegar:", err)
        }
    }

    function formatarCep(cep) {
        const s = String(cep).replace(/\D/g, "")
        if (s.length === 8) return s.slice(0, 5) + "-" + s.slice(5)
        return cep
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F8FF' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Histórico</Text>
                        <Text style={styles.subtitle}>
                            {historico.length} {historico.length === 1 ? 'busca realizada' : 'buscas realizadas'}
                        </Text>
                    </View>
                    {historico.length > 0 && (
                        <Pressable style={styles.clearBtn} onPress={limparHistorico}>
                            <Feather name="trash-2" size={15} color="white" />
                            <Text style={styles.textClear}>Limpar</Text>
                        </Pressable>
                    )}
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {historico.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconContainer}>
                                <AntDesign name="clockcircleo" size={48} color="#5AB2FF" />
                            </View>
                            <Text style={styles.emptyTitle}>Nenhum histórico</Text>
                            <Text style={styles.emptyText}>
                                Suas buscas de CEP aparecerão aqui
                            </Text>
                        </View>
                    ) : (
                        historico.map((valor, index) => (
                            <Pressable
                                key={index}
                                style={styles.item}
                                onPress={() => navegarParaMapa(valor)}
                            >
                                <View style={styles.itemLeft}>
                                    <View style={styles.iconCircle}>
                                        <AntDesign name="history" size={22} color="#3B82F6" />
                                    </View>
                                    <View>
                                        <Text style={styles.cepLabel}>CEP</Text>
                                        <Text style={styles.cepValue}>{formatarCep(valor)}</Text>
                                    </View>
                                </View>
                                <View style={styles.itemRight}>
                                    <TouchableOpacity
                                        style={[styles.actionBtn, styles.starBtn]}
                                        onPress={() => adicionarFavorito(valor, index)}
                                        disabled={favoritando === index}
                                    >
                                        <Feather
                                            name={favoritando === index ? "loader" : "star"}
                                            size={16}
                                            color="#F59E0B"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.actionBtn, styles.deleteBtn]}
                                        onPress={() => removerItem(index)}
                                    >
                                        <Feather name="trash-2" size={16} color="#EF4444" />
                                    </TouchableOpacity>
                                    <Feather name="chevron-right" size={20} color="#94A3B8" />
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
