{/*Esta service recebe o endereço escolhido e envia para a API do nominatim, que
   retorna a latitude e longitude do endereço*/}
export async function buscarCoordenadas(endereco){
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json`
    )
      const res=await response.json()
      return res
  }
  {/*OBS: A função encodeURIComponent, serve para codificar o endereço para facilitar a 
    leitura da API*/}