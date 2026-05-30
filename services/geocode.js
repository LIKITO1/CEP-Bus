export async function buscarCoordenadas(endereco){
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json`,{
        headers:{
          "User-Agent":"ExpoApp"
        }
      })
    return res.json()
  }