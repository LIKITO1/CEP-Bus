import {StyleSheet} from "react-native"
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from "expo-linear-gradient";
export default function CepIcon(){
    return(
            <LinearGradient colors={['#4843F5','#0086E8']} start={{x:0,y:1}} style={styles.container}>
                <Feather name="map-pin" size={28} color="white" style={styles.icon} />
            </LinearGradient>
    )
}
const styles=StyleSheet.create({
    container:{
        borderRadius:100,
        width:68,
        height:68,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        overflow:'visible'
    },
    icon:{
        lineHeight:32
    }
})
