export async function rotaAPe(latitude,longitude,latitudeP,longitudeP){
  /*Definindo url que vai fazer a requisição para pedir a distancia real,
  tempo e rota entre o CEP digitado e os ponto de onibus
  */
  const url = `
  https://router.project-osrm.org/route/v1/foot/${longitude},${latitude};${longitudeP},${latitudeP}?overview=full&geometries=geojson`
  try{
    //Fazendo a requisição na API
    const response = await fetch(url)
    //Convertendo a resposta para json
    const res = await response.json()
    //Definindo as coordenadas como a resposta recebida
    const coords = res.routes[0].geometry.coordinates
    /*Aqui estamos resolvendo o problema um problema:
    Esta API retorna longitude e latitude, mas para renderizar o mapa
    utilizamos latitude e longitude. Então, estamos invertendo a ordem da resposta
    para ficar correta na hora de chamar no mapa
    */
    const rota = coords.map(([lon, lat]) => [lat, lon])
    //Calculando a distancia entre o CEP e o ponto de onibus
    const distancia = res.routes[0].distance
    //O tempo de caminhada, pois escolhemos calcular a rota a pé
    const tempo = res.routes[0].duration
    //Retornando as coordenadas de forma correta, o tempo de trajeto e a distancia
    return { rota, tempo, distancia }
  }catch(err){
    //Caso algum dado não seja recebido, é retornada uma mensagem de erro que será exibida para o usuário
    return {msg:"Erro ao tentar calcular a rota a pé"}
  }
}