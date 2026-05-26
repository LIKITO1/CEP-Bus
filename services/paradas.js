export async function buscarParadas(latitude,longitude){
    const query = `
    [out:json];
    node
      [highway=bus_stop]
      (around:300,${latitude},${longitude});
    out;`
    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method:"POST",
        body: query
      }
    )
    const res = await response.json()
    return res.elements
  }