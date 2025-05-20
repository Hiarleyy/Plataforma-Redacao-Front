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

  const getRedacoes = async (corrigidas = false) => {
    if (corrigidas) {
      const response = await axios.get("http://localhost:3000/redacoes?corrigidas=true")
      return response.data.data
    }

    const response = await axios.get("http://localhost:3000/redacoes")
    return response.data.data
  }

  const getRedacaoById = async (id) => {
    const response = await axios.get(`http://localhost:3000/redacoes/${id}`)
    return response.data.data
  }

  const getRedacoesUser = async (id) => {
    const response = await axios.get(`http://localhost:3000/redacoes${id}`)
    return response.data.data
  }
  
  const getRedacoesCorrigidas = async (id) => {
    const response = await axios.get(`http://localhost:3000/redacoes${id}&corrigidas=true`)
    return response.data.data
  }

  const downloadProposta = async () => {
    const response = await axios.get("http://localhost:3000/propostas/download/3d0803ec-63cf-409c-97d0-27fa5177fa8b")
    return response.data
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
    downloadProposta,
    getRedacoesUser,
    getRedacaoById
  }
}

export default fetchData