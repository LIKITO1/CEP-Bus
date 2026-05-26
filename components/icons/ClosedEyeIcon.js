import Feather from '@expo/vector-icons/Feather';
export default function ClosedEyeIcon({styles,onPress}){
    return(
        <Feather name="eye-off" size={26} color="black" style={styles} onPress={onPress}/>
    )
}