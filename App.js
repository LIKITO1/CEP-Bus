import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import Perfil from "./components/pages/Perfil"
import Map from "./components/pages/Map"
import Favorite from "./components/pages/Favorite"
import FrequentLocals from './components/pages/FrequentLocals';
import Historic from './components/pages/Historic';
const Stack=createNativeStackNavigator()
export default function App(){
  const linking={
    prefixes:['http://localhost:8081','https://busnow.netlify.app'],
    config:{
      screens:{
        Login:'',
        Home:'home',
        Perfil:'perfil',
        Map:'map',
        Favorite:'favorite',
        Frequent:'frequent'
      }
    }
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialMapName='Login' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Perfil' component={Perfil}/>
        <Stack.Screen name='Map' component={Map}/>
        <Stack.Screen name='Favorite' component={Favorite}/>
        <Stack.Screen name='Frequent' component={FrequentLocals}/>
        <Stack.Screen name='Historic' component={Historic}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}