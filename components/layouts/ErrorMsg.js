import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {useEffect,useState} from "react"
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
const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 60,
      width: "100%",
      alignItems: "center",
      zIndex: 9999,
      paddingHorizontal: 10,
    },
    alert: {
      width: "100%",
      minHeight: 60,
      backgroundColor: "#E53935",
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
    },
    msg: {
      flex: 1,
      marginLeft: 12,
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "600",
      lineHeight: 20,
    },
  });