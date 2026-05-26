import {View,StyleSheet} from "react-native"
import Feather from '@expo/vector-icons/Feather';
export default function CepIcon(){
    return(
        <View style={styles.container}>
            <Feather name="map-pin" size={24} color="black" />
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        borderRadius:100,
        width:50,
        height:50,
        backgroundColor:'gray',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
})