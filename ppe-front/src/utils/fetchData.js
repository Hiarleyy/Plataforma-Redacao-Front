import axios from "axios"

const fetchData = () => {
  const getTurmas = async () => {
    const response = await axios.get("http://localhost:3000/turmas")
    return response.data.data
  }

  const getTurmaById = async (id) => {
    const response = await axios.get(`http://localhost:3000/turmas/${id}`)
    return response.data.data
  }

  const getAlunos = async (filter) => {
    if (!filter) {
      const response = await axios.get("http://localhost:3000/usuarios")
      return response.data.data
    }

    const response = await axios.get(`http://localhost:3000/usuarios?filter=${filter}`)
    return response.data.data
  }

  const getAlunoById = async (id) => {
    const response = await axios.get(`http://localhost:3000/usuarios/${id}`)
    return response.data.data
  }

  const getModulos = async () => {
    const response = await axios.get("http://localhost:3000/modulos")
    return response.data.data
  }

  const getModuloById = async (id) => {
    const response = await axios.get(`http://localhost:3000/modulos/${id}`)
    return response.data.data
  }

  const getVideoById = async (id) => {
    const response = await axios.get(`http://localhost:3000/videos/${id}`)
    return response.data.data
  }

  const getRanking = async () => {
    const response = await axios.get("http://localhost:3000/ranking")
    return response.data.data
  }
  
  const getPropostas = async() =>{
    const response = await axios.get ("http://localhost:3000/propostas")
    return response.data.data
  }

  const getRedacoes = async () => {
    const response = await axios.get("http://localhost:3000/redacoes")
    return response.data.data
  }
  const getRedacoesUser = async (id) => {
    if (id) {
      const response = await axios.get(`http://localhost:3000/redacoes?usuarioId=${id}`)
      return response.data.data
    }
    // Retorna todas as redações se nenhum ID de usuário for fornecido
    const response = await axios.get(`http://localhost:3000/redacoes`)
    return response.data.data
  }

    const getRedacoesCorrigidas = async (id) => {
    if (id) {
      const response = await axios.get(`http://localhost:3000/redacoes/${id}?corrigidas=true`)
      return response.data.data
    }
    // Busca todas as redações corrigidas se não houver ID específico
    const response = await axios.get(`http://localhost:3000/redacoes?corrigidas=true`)
    return response.data.data
  }

  return { 
    getTurmas, 
    getTurmaById, 
    getAlunos, 
    getAlunoById,
    getModulos,
    getModuloById,
    getVideoById,
    getRanking,
    getRedacoes,
    getPropostas,
    getRedacoesCorrigidas,
    getRedacoesUser
  }
}

export default fetchData