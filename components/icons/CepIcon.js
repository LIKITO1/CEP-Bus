import {StyleSheet} from "react-native"
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from "expo-linear-gradient";
export default function CepIcon(){
    return(
            <LinearGradient colors={['#4843F5','#0086E8']} start={{x:0,y:1}} style={styles.container}>
                <Feather name="map-pin" size={26} color="white" />
            </LinearGradient>
    )
}
const styles=StyleSheet.create({
    container:{
        borderRadius:100,
        width:60,
        height:60,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
})