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
  const getPropostas = async() =>{
    const response = await axios.get ("http://localhost:3000/propostas")
    return response.data.data
  }
  const getRedacoes = async () => {
    const response = await axios.get("http://localhost:3000/redacoes")
    return response.data.data
  }

  const getRedacaoById = async (id) => {
    const response = await axios.get(`http://localhost:3000/redacoes?usuarioId=${id}`)
    return response.data.data
  }

  const getRedacoesUser = async () => {
    const response = await axios.get(`http://localhost:3000/redacoes?usuarioId=66ef8409-473b-454e-97ff-beb62db0a8c2`)
    return response.data.data
  }

  
  const getRedacoesCorrigidas = async () => {
    const response = await axios.get(`http://localhost:3000/redacoes?usuarioId=66ef8409-473b-454e-97ff-beb62db0a8c2&corrigidas=true`)
    return response.data.data
  }

  const getCorrecoes= async () => {
    const response = await axios.get(`http://localhost:3000/correcoes`)
    return response.data.data
  }
  const getNotaSimulados = async () => {
    const response = await axios.get(`http://localhost:3000/notaSimulado`)
    return response.data.data
  } 
  const getSimuladoById = async (id) => {
    const response = await axios.get(`http://localhost:3000/simulados/${id}`)
    return response.data.data
  }
  const getSimulados = async () => {
    const response = await axios.get(`http://localhost:3000/simulados`)
    return response.data.data
  }
  const getNotasbySimuladoId = async (id) => {
    const response = await axios.get(`http://localhost:3000/notaSimulado/simuladoId/${id}`)
    return response.data.data
  }
  const getSimuladoByIdTurma = async (id) => {
    const response = await axios.get(`http://localhost:3000/simulados/turmaId/${id}`)
    return response.data.data
  }



  return { 
    getTurmas, 
    getNotasById,
    getTurmaById, 
    getAlunos, 
    getAlunoById,
    getModulos,
    getModuloById,
    getVideoById,
    getRanking,
    getRedacoes,
    getRedacoesCorrigidas,
    getRedacoesUser,
    getPropostas,
    getRedacaoById,
    getCorrecoes,
    getNotaSimulados,
    getSimuladoById,
    getSimulados,
    getNotasbySimuladoId,
    getSimuladoByIdTurma
  }
}

export default fetchData