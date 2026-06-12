//Importação do AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage"
export async function buscarParadas(latitude,longitude){
  const lat=latitude.toFixed(3)//Diminuindo as casas decimais de latitude
  const lon=longitude.toFixed(3)//Diminuindo as casas decimais de longitude
  const coordenada=`${lat}/${lon}`//Juntando os dois para poder salvar como uma coordenada
  const cache=await AsyncStorage.getItem(coordenada)//Verificando se a coordenada já esta armazenada
  if(cache){
    //Se já estiver armazenada, os pontos armazenados serão retornados como resposta
    return JSON.parse(cache)
  }
  /*Query para fazer a requisição na API.
  Aqui estou dizendo que:
  -A resposta deve ser em json
  -O tempo de espera pode ser de até 10 segundos
  -Quem esta fazendo a requisição é o node
  -Quero buscar os pontos de onibus em um raio de 300 metros, a partir da latitude e longitude recebidas*/
    const query = `
    [out:json][timeout:10];
    node
      [highway=bus_stop]
      (around:300,${latitude},${longitude});
    out;`
    try{
      //Fazendo a requisição na API do overpass
    const response = await fetch("https://overpass-api.de/api/interpreter",{
        method:"POST",
        body: query
      })
      //Convertendo a resposta para json
    const res = await response.json()
    //verificando se a resposta não veio vazia
    if(res.elements?.length){
      //Armazenando as coordenadas com o json convertido em texto armazenando os pontos de onibus
      await AsyncStorage.setItem(coordenada,JSON.stringify(res.elements))
      //Retornando os pontos de onibus encontrados
      return res.elements
    }
  }catch(err){
    //Se der erro, mostro que a primeira API não funcionou
    console.log("Erro na API 1")
  }
  try{
    /*Se a primeira não funcionar, faço uma requisição no outro mirror(que é basicamente
    uma cópia da primeira API, mas se ela for atualizada e falhar, ainda terá essa opção)*/
    const response = await fetch("https://lz4.overpass-api.de/api/interpreter",{
          method:"POST",
          body: query
      })
      //Convertendo a resposta para texto, pois ela vem assim
      const text=await response.text()
      //Transformando o texto em um objeto manipulável
      const res=JSON.parse(text)
      //Verificando se a resposta não esta vazia
      if(res.elements?.length>0){
        //Armazenando a coordenada com seus pontos de onibus encontrados
        await AsyncStorage.setItem(coordenada,JSON.stringify(res.elements))
        //Retornando os pontos de onibus como resposta
        return res.elements
      }
    }catch(err){
      //Se der erro nas duas APIs, será retornado um array vazio
      console.log("Erro nas duas APIs")
      return []
    }
  }