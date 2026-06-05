export async function rotaAPe(latitude,longitude,latitudeP,longitudeP) {
    const response = await fetch("https://api.openrouteservice.org/v2/directions/foot-walking/geojson",{
        method: "POST",
        headers: {
          Authorization: "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImZlZWE1ODQwMzU1YjQ3ZGFiMTRlNDMwY2NiM2YyZDkwIiwiaCI6Im11cm11cjY0In0=",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: [
            [longitude, latitude], // usuário
            [longitudeP, latitudeP], // ponto
          ],
        }),
      }
    )
    const res = await response.json()
    const coords=res.features[0].geometry.coordinates
    const rota=coords.map((valor)=>[
        valor[1],
        valor[0]
    ])
    const tempo=res.features[0].properties.summary.duration
    const distancia=res.features[0].properties.summary.distance
    return {rota,tempo,distancia}
  }
