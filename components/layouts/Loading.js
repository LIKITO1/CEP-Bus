import {View,Animated,Easing} from "react-native"
import { globalStyles } from "../styles/globalStyles"
import {styles} from "../styles/loadingStyles"
import LoadingIcon from "../icons/LoadingIcon"
import {useRef,useEffect} from "react"
export default function Loading(){
    const animation=useRef(new Animated.Value(0)).current
    useEffect(()=>{
        Animated.loop(
            Animated.timing(animation,{
                toValue:1,
                duration:500,
                easing:Easing.linear,
                useNativeDriver:false
            }).start()
        )
    },[])
    const rodar=animation.interpolate({
        inputRange:[0,1],
        outputRange:["0deg","360deg"]
    })
    return(
        <View style={[globalStyles.container,styles.container]}>
            <Animated.View style={{transform:[{rotate:rodar}]}}>
                <LoadingIcon styles={styles.loadAnimation}/>
            </Animated.View>
        </View>
    )
}