import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    btnsLocalization:{
      position:'absolute',
      elevation:5,
      zIndex:9999,
      height:70,
      width:'100%',
      bottom:'10%',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-around',
      flexDirection:'row',
      right:0
    },
    btn:{
      width:130,
      height:50,
      backgroundColor:'white',
      display:'flex',
      alignItems:'center',
      justifyContent:"center",
      borderRadius:15,
      boxShadow:'0px 0px 10px 1px rgba(0,0,0,0.5)',
      padding:5
    },
    textoBtn:{
      fontSize:15,
      fontWeight:600,
      color:'white'
    },
    feedback:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:24,
      paddingBottom:80
    },
    feedbackTitle:{
      fontSize:22,
      fontWeight:'bold',
      color:'#1F2937',
      marginBottom:8,
      textAlign:'center'
    },
    feedbackText:{
      fontSize:15,
      color:'#475569',
      textAlign:'center',
      lineHeight:22,
      marginBottom:20
    },
    feedbackButton:{
      minWidth:160,
      height:48,
      borderRadius:12,
      backgroundColor:'#3B82F6',
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:18
    },
    feedbackButtonText:{
      color:'white',
      fontSize:15,
      fontWeight:'bold'
    }
  })
  
