//Importação das bibliotecas
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {View} from "react-native"
//Importação das páginas
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import Map from "./components/pages/Map"
import Favorite from "./components/pages/Favorite"
import Historic from './components/pages/Historic';
import Cadastro from './components/pages/Cadastro';
//Importação dos componentes
import ConnectionConfirm from './components/layouts/ConnectionConfirm';
//Chamando função da biblioteca
const Stack=createNativeStackNavigator()
export default function App(){
  //Definindo a rota de cada página
  const linking={
    prefixes:['http://localhost:8081','https://cepbus.netlify.app'],
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
    <>
      {/*Criando o contêiner que gerencia a navegação na aplicação*/}
      <NavigationContainer linking={linking}>
        {/*Esta View faz com que todas as páginas tenham essa estilização definida no style dela*/}
        <View style={{flex:1,paddingTop:25}}>
          {/*Criando contêiner que permite a criação do sistema de telas e definindo
          a login como página inicial*/}
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
          <Stack.Screen name='Login' component={Login}/>{/*Criando tela de Login*/}
          <Stack.Screen name='Home' component={Home}/>{/*Criando tela Principal*/}
          <Stack.Screen name='Map' component={Map}/>{/*Criando tela de Mapa*/}
          <Stack.Screen name='Favorite' component={Favorite}/>{/*Criando tela de Favoritos*/}
          <Stack.Screen name='Historic' component={Historic}/>{/*Criando tela de Histórico*/}
          <Stack.Screen name='Cadastro' component={Cadastro}/>{/*Criando tela de Cadastro*/}
        </Stack.Navigator>
        <ConnectionConfirm/>{/*Componente de verificar conexão.
        Este componente aparecerá em todas as telas*/}
        </View>
      </NavigationContainer>
    </>
  );
}