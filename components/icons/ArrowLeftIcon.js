import Feather from '@expo/vector-icons/Feather';
import {Pressable,StyleSheet} from "react-native"
import { useNavigation } from '@react-navigation/native';
export default function ArrowLeftIcon(){
    const navigation=useNavigation()
    function back(){
        if(navigation.canGoBack()){
            navigation.goBack()
        }else{
            navigation.navigate("Home")
        }
    }
    return(
        <Pressable onPress={back}>
            <Feather name="arrow-left" color="black" style={styles.icon}/>
        </Pressable>
    )
}
const styles=StyleSheet.create({
    icon:{
        fontSize:30
    }
})