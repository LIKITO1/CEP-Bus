export async function buscarCoordenadas(endereco){
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json`)
      const res=await response.json()
      return res
  }