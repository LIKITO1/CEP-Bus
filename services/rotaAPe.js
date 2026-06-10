export async function rotaAPe(latitude, longitude, latitudeP, longitudeP) {
  const url = `https://router.project-osrm.org/route/v1/foot/${longitude},${latitude};${longitudeP},${latitudeP}?overview=full&geometries=geojson`
  const response = await fetch(url)
  const res = await response.json()
  const coords = res.routes[0].geometry.coordinates
  const rota = coords.map(([lon, lat]) => [lat, lon])
  const distancia = res.routes[0].distance
  const tempo = res.routes[0].duration
  return { rota, tempo, distancia }
}