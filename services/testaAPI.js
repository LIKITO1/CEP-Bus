export async function testaAPI(){
    //Esta é só uma service para 'acordar o backend que esta no render'
    //Ela chama a rota de teste
    const res=await fetch("https://backend-cep-bus.onrender.com/test")
    //Converte a resposta para json
    const data=await res.json()
    //E retorna a resposta
    return data    
}