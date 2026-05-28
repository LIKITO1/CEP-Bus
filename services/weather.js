export async function buscarClima(latitude,longitude){
    const response=await fetch("http://localhost:3000/clima",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({latitude,longitude})
    })
    const res=await response.json()
    return res
}