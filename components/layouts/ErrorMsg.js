import { View, Text} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {useEffect,useState} from "react"
import {styles} from "../styles/errorStyles"
export default function ErrorMsg({ msg }) {
  const [mostrar,setMostrar]=useState(true)
  useEffect(()=>{
    setInterval(()=>{
      setMostrar(false)
    },1000)
  },[])
  return (
    <>
    {mostrar&&(
      <View style={styles.container}>
        <View style={styles.alert}>
          <MaterialIcons name="error-outline" size={22} color="white" />
          <Text style={styles.msg}>{msg}</Text>
        </View>
      </View>
    )}
    </>
  );
}