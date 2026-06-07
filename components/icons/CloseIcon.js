import AntDesign from '@expo/vector-icons/AntDesign';
import {Pressable,StyleSheet} from "react-native"
export default function CloseIcon({onPress}){
    return(
        <Pressable style={styles.icon} onPress={onPress}>
            <AntDesign name="close" size={26} color="white"/>
        </Pressable>
    )
}
const styles=StyleSheet.create({
    icon:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#ed4339',
        padding:5,
        borderRadius:50,
        marginLeft:'84%',
        marginTop:2
    }
})