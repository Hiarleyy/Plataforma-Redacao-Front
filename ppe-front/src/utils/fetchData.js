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

  return { 
    getTurmas, 
    getTurmaById, 
    getAlunos, 
    getAlunoById,
    getModulos,
    getModuloById,
    getVideoById,
    getRanking,
  }
}

export default fetchData