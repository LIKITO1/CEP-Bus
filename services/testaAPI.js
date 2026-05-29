export async function testaAPI(){
    const res=await fetch("https://backend-cep-bus.onrender.com/test")
    const data=await res.json()
    return data    
}