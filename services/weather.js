export async function buscarClima(latitude,longitude){
    const response=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`)
    const res=await response.json()
    return res.current.temperature_2m
}