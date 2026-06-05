import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
export default function ArrowDownIcon({style}){
    return(
        <AntDesign name="caret-down" style={[styles.icon,style]}/>
    )
}
const styles=StyleSheet.create({
    icon:{
        color:'white',
        fontSize:20,
        position:'absolute',
        right:10,
        top:'30%'
    }
})