import AsyncStorage from "@react-native-async-storage/async-storage"
export async function buscarParadas(latitude,longitude){
  const lat=latitude.toFixed(3)
  const lon=longitude.toFixed(3)
  const coordenada=`${lat}/${lon}`
  const cache=await AsyncStorage.getItem(coordenada)
  if(cache){
    return JSON.parse(cache)
  }
    const query = `
    [out:json][timeout:10];
    node
      [highway=bus_stop]
      (around:300,${latitude},${longitude});
    out;`
    try{
    const response = await fetch("https://overpass-api.de/api/interpreter",{
        method:"POST",
        body: query
      })
    const res = await response.json()
    if(res.elements?.length){
      await AsyncStorage.setItem(coordenada,JSON.stringify(res.elements))
      return res.elements
    }
  }catch(err){
    console.log("Erro na API 1")
  }
  try{
    const response = await fetch("https://lz4.overpass-api.de/api/interpreter",{
          method:"POST",
          body: query
      })
      const text=await response.text()
      const res=JSON.parse(text)
      if(res.elements?.length>0){
        await AsyncStorage.setItem(coordenada,JSON.stringify(res.elements))
        return res.elements
      }
    }catch(err){
      console.log("Erro nas duas APIs")
      return []
    }
  }