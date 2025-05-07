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

  const getNotasById = async (id) => {
    const response = await axios.get(`http://localhost:3000/redacoes/${id}`)
    return response.data.data
  }
  const getRanking = async () => {
    const response = await axios.get("http://localhost:3000/ranking")
    return response.data.data
  }

  const getRedacoes = async () => {
    const response = await axios.get(`http://localhost:3000/redacoes?usuarioId=1921a46c-2a02-45da-bb04-b93a60622746`)
    return response.data.data
  }

  
  const getRedacoesCorrigidas = async () => {
    const response = await axios.get(`http://localhost:3000/redacoes?usuarioId=1921a46c-2a02-45da-bb04-b93a60622746&corrigidas=true`)
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
    getRedacoesCorrigidas,
  }
}

export default fetchData