import Ionicons from '@expo/vector-icons/Ionicons';
import {Pressable,StyleSheet} from "react-native"
export default function AddIcon(){
    return(
        <Pressable>
            <Ionicons name="add" color="black" style={styles.icon}/>
        </Pressable>
    )
}
const styles=StyleSheet.create({
    icon:{
        fontSize:30
    }
})