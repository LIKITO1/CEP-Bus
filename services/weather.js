export async function buscarClima(latitude,longitude){
    const response=await fetch("https://backend-cep-bus.onrender.com/clima",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({latitude,longitude})
    })
    const res=await response.json()
    console.log(res)
}