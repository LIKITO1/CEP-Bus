export async function distancia(latitude,longitude){
    const response=await fetch("https://backend-cep-bus.onrender.com/paradasProximas",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({latitude,longitude})
    })
    const res=await response.json()
    return res
}