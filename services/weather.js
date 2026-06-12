export async function buscarClima(latitude,longitude){
    //Esta service vai falar o clima que esta no CEP digitado
    //Aqui é feita a requisição no backend
    const response=await fetch("https://backend-cep-bus.onrender.com/clima",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({latitude,longitude})/*Passando latitude e longitude
        como um objeto convertido em texto*/
    })
    //Transformando resposta em json
    const res=await response.json()
    //Retornando resposta
    return res
}