import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import Map from "./components/pages/Map"
import Favorite from "./components/pages/Favorite"
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
        Map:'map/:latitude/:longitude',
        Favorite:'favorite',
        Cadastro:'cadastro',
        Historic:'historic'
      }
    }
  }
  return (
    <NavigationContainer linking={linking}>
      <View style={{flex:1,paddingTop:25}}>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Map' component={Map}/>
        <Stack.Screen name='Favorite' component={Favorite}/>
        <Stack.Screen name='Historic' component={Historic}/>
        <Stack.Screen name='Cadastro' component={Cadastro}/>
      </Stack.Navigator>
      <ConnectionConfirm/>
      </View>
    </NavigationContainer>
  );
}