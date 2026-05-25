import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    btn:{
      position:'absolute',
      width:120,
      height:50,
      elevation:5,
      right:10,
      bottom:100,
      backgroundColor:'white',
      display:'flex',
      alignItems:'center',
      justifyContent:"center",
      borderRadius:15,
      zIndex:9999
    },
    btn1:{
      position:'absolute',
      width:120,
      height:50,
      elevation:5,
      right:10,
      bottom:170,
      backgroundColor:'white',
      display:'flex',
      alignItems:'center',
      justifyContent:"center",
      borderRadius:15,
      zIndex:9999
    },
    textoBtn:{
      fontSize:15,
      fontWeight:'bold'
    },
    clima:{
        position:'absolute',
        elevation:5,
        top:10,
        right:10,
        width:120,
        height:60,
        backgroundColor:'white',
        borderRadius:10,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        zIndex:9999
    },
    temp:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        fontWeight:800,
        fontSize:15
    }
  })
  