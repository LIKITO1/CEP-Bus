export async function buscarEnd(cep){
    //Esta função busca o endereço à partir do CEP
    //Aqui faz a requisição
    const response =await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    //Converte a resposta para json
    const res=await response.json()
    //E retorna a resposta
    return res
  }
export async function buscarCep(uf,cidade,rua){
  //Aqui a função busca o CEP à partir do endereço
  //Faz a requisição
  const response=await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`)
  //Converte a resposta em json
  const res=await response.json()
  //Retorna a resposta
  return res
}