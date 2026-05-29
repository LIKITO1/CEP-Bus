import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import Perfil from "./components/pages/Perfil"
import Map from "./components/pages/Map"
import Favorite from "./components/pages/Favorite"
import FrequentLocals from './components/pages/FrequentLocals';
import Historic from './components/pages/Historic';
import Cadastro from './components/pages/Cadastro';
import ConnectionConfirm from './components/layouts/ConnectionConfirm';
import {View} from "react-native"
const Stack=createNativeStackNavigator()
export default function App(){
  const linking={
    prefixes:['http://localhost:8081','https://busnow.netlify.app'],
    config:{
      screens:{
        Login:'',
        Home:'home',
        Perfil:'perfil',
        Map:'map/:latitude/:longitude',
        Favorite:'favorite',
        Frequent:'frequent',
        Cadastro:'cadastro',
        Historic:'historic'
      }
    }
  }
  return (
    <NavigationContainer linking={linking}>
      <View style={{flex:1,paddingTop:25}}>
      <Stack.Navigator initialMapName='Login' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Perfil' component={Perfil}/>
        <Stack.Screen name='Map' component={Map}/>
        <Stack.Screen name='Favorite' component={Favorite}/>
        <Stack.Screen name='Frequent' component={FrequentLocals}/>
        <Stack.Screen name='Historic' component={Historic}/>
        <Stack.Screen name='Cadastro' component={Cadastro}/>
      </Stack.Navigator>
      <ConnectionConfirm/>
      </View>
    </NavigationContainer>
  );
}