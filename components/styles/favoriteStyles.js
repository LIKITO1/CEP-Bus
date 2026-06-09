import { StyleSheet } from "react-native"
export const styles=StyleSheet.create({
    title:{
        fontSize:30,
        fontWeight:'bold',
        marginHorizontal:'auto'
    },
    locais:{
        width:'90%',
        height:'70%',
        marginHorizontal:'auto',
        marginTop:30,
        borderRadius:20,
        boxShadow:'inset 0px 0px 30px 1px rgba(0,0,0,0.3)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'
    },
    local:{
        width:'100%',
        height:90,
        padding:5,
        backgroundColor:'gray',
        borderRadius:20,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'
    },
    textInfo:{
       fontSize:17,
       fontWeight:600 
    }
})