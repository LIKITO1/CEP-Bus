import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
export default function SettingIcon(){
    return(
        <AntDesign name="setting" size={25} color="black" style={styles.setting}/>
    )
}
const styles=StyleSheet.create({
    setting:{
        position:'absolute',
        top:5,
        right:10
    }
})