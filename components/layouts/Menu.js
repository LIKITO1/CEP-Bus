import {View} from "react-native"
import HomeIcon from "../icons/HomeIcon"
import PerfilIcon from "../icons/PerfilIcon"
import MapIcon from "../icons/MapIcon"
import FavoritesIcon from "../icons/FavoritesIcon"
import { styles } from "../styles/menuStyles"
export default function Menu(){
  return (
    <View style={styles.container}>
      <HomeIcon/>
      <MapIcon/>
      <FavoritesIcon/>
      <PerfilIcon/>
    </View>
  )
}