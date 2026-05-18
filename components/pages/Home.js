import {View,Text} from "react-native"
import Menu from "../layouts/Menu"
import { globalStyles } from "../styles/globalStyles"
import {styles} from "../styles/homeStyles"
import {useState} from "react"
import NotificationIcon from "../icons/NotificationIcon"
import { Button, TextInput } from "react-native-web"
export default function Home(){
  const [nameUser,setNameUser]=useState("Lucas")
  const [line,setLine]=useState("544")
  const [point1,setPoint1]=useState("Terminal Central")
  const [point2,setPoint2]=useState("Jardim Ámérica")
  const [time,setTime]=useState("8 min")
  return(
    <View style={[globalStyles.container,styles.container]}>
      <View style={styles.containerOne}>
        <View>
          <Text style={styles.text}>Olá, {nameUser}!</Text>
          <Text style={styles.subtext}>Encontre o ônibus mais próximo de você</Text>
        </View>
        <NotificationIcon/>
      </View>
      <View style={styles.containerTwo}>
        <Text style={styles.text}>Informe seu CEP</Text>
        <Text style={styles.subtext}>Vamos calcular a melhor rota para você</Text>
        <TextInput style={styles.input}/>
        <Button title='Calcular Rota'/>
      </View>
      <View style={styles.containerThree}>
        <Text style={styles.text}>Sua Rota</Text>
        <Text style={styles.subtext}>Confira o trajeto próximo e os horários</Text>
      </View>
      <View style={styles.containerFour}>
        <View style={styles.line}>
          <Text>Linha {line}</Text>
          <Text>{point1}{">"}{point2}</Text>
        </View>
        <View style={styles.nextBus}>
          <Text>Próximo Ônibus:</Text>
          <Text>{time}</Text>
        </View>
      </View>
      <Menu/>
    </View>
  )
}