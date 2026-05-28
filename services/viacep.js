export async function buscarEnd(cep){
    const res =await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    return res.json()
  }
export async function buscarCep(uf,cidade,rua){
  const res=await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`)
  return res.json()
}