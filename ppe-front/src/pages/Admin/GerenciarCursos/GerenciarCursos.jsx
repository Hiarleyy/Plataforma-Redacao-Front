import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import InfoCard from "../../../components/InfoCard/InfoCard"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import axios from "axios"
import fetchData from "../../../utils/fetchData"
import useUseful from "../../../utils/useUseful"
import { useState, useEffect } from "react"
import Pagination from "../../../components/Pagination/Pagination"
import Message from "../../../components/Message/Message"
import Loading from "../../../components/Loading/Loading"

const GerenciarCursos = () => {
  const [formMessage, setFormMessage] = useState(null)
  const [modulos, setModulos] = useState([])
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [playlistUrl, setPlaylistUrl] = useState("")
  const { brasilFormatData } = useUseful()
  const [isLoading, setIsLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentModulos = modulos.slice(indexOfFirstItem, indexOfLastItem)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post("http://localhost:3000/modulos", { 
        "nome": nome,
        "descricao": descricao,
        "playlistUrl": playlistUrl
      })

      setFormMessage({ 
        type: "success", 
        text: `Curso ${response.data.data.nome} criado com sucesso.` 
      })
    } catch (error) {
      setFormMessage({
        type: "error",
        text: error.response.data.error
      });
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { getModulos } = fetchData() 
      const response = await getModulos()
      setModulos(response)
    }
  
    getData()
  }, [])

  return (
    <div className={styles.container}>
      <Title title="Gerenciar cursos" />

      <div className={styles.main_content}>
        <div className={styles.bg_left}>
          {modulos.length === 0 ? <div className={styles.loading}><Loading /></div> :
            <>
              <p className={styles.title}>Seus cursos</p>

              <div className={styles.cursos_container}>
                {currentModulos.map((modulo) => (
                  <InfoCard
                    key={modulo.id}
                    title={modulo.nome}
                    subtitle={brasilFormatData(modulo.dataCriacao)}
                    link={modulo.id}
                  />
                ))}
              </div>

              <div className={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  totalItems={modulos.length}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          }
        </div>

        <div className={styles.bg_right}>
          <p className={styles.form_title}>Cadastre um novo curso</p>

          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Nome do curso"
              color="#1A1A1A"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            >
              <i className="fa-solid fa-tv"></i>
            </Input>

            <Input
              type="text"
              placeholder="Descrição do curso"
              color="#1A1A1A"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            >
              <i className="fa-solid fa-comment"></i>
            </Input>

            <Input
              type="text"
              placeholder="Link da playlist"
              color="#1A1A1A"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
            >
              <i class="fa-solid fa-link"></i>
            </Input>

            <Message 
              text={formMessage ? formMessage.text : ""} 
              type={formMessage ? formMessage.type : ""} 
            />

            <Button 
              text_size="20px" 
              text_color="#E0E0E0" 
              padding_sz="10px" 
              bg_color="#DA9E00"
              isLoading={isLoading}
            >CADASTRAR</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GerenciarCursos