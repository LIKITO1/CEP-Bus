import { StyleSheet, Text, View, TextInput,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import Perfil from "./components/pages/Perfil"
import Route from "./components/pages/Route"
import Favorite from "./components/pages/Favorite"
const Stack=createNativeStackNavigator()
export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Perfil' component={Perfil}/>
        <Stack.Screen name='Route' component={Route}/>
        <Stack.Screen name='Favorite' component={Favorite}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}