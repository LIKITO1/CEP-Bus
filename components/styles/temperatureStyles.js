import { StyleSheet } from "react-native"
export const styles=StyleSheet.create({
    container:{
        position:'absolute',
        top:10,
        right:10,
        zIndex:9999
    },
    text:{
        fontSize:18,
        fontWeight:600
    },
    info:{
        boxShadow:'0px 0px 20px 2px rgba(0,0,0,0.3)',
        width:150,
        padding:10,
        backgroundColor:'white',
        borderRadius:20,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        gap:15
    }
})